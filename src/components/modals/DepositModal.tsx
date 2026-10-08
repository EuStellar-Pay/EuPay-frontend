import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useWallet } from '../../context/WalletContext'
import { buildDeposit } from '../../lib/api'
import { signAndSubmit, xlmToStroops } from '../../lib/tx'

interface Props {
  address: string
  onClose: () => void
  onSuccess: () => void
}

export function DepositModal({ address, onClose, onSuccess }: Props) {
  const { getAuthHeaders } = useWallet()
  const [token,  setToken]  = useState(import.meta.env.VITE_XLM_TOKEN ?? '')
  const [amount, setAmount] = useState('')
  const [busy,   setBusy]   = useState(false)

  const STELLAR = /^G[A-Z0-9]{55}$/

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!STELLAR.test(token))           return toast.error('Invalid token address')
    if (!amount || parseFloat(amount) <= 0) return toast.error('Enter a valid amount')

    setBusy(true)
    const tid = toast.loading('Building deposit transaction…')
    try {
      const headers = await getAuthHeaders()
      const { xdr } = await buildDeposit(address, token, xlmToStroops(amount), headers as any)
      toast.loading('Waiting for Freighter…', { id: tid })
      const { hash } = await signAndSubmit(xdr)
      toast.success(`Deposited ${amount} XLM`, { id: tid })
      onSuccess()
      onClose()
    } catch (err: any) {
      toast.error(err.message ?? 'Deposit failed', { id: tid })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="w-full max-w-sm bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
        <div className="h-[2px] bg-emerald-600" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-white">Deposit to treasury</h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-800 transition-colors text-lg">×</button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1.5">Token contract address</label>
              <input
                value={token} onChange={e => setToken(e.target.value)}
                placeholder="G… (native XLM contract)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1.5">Amount (XLM)</label>
              <input
                type="number" step="0.0000001" min="0"
                value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="1000"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <button
              type="submit" disabled={busy}
              className="w-full py-2.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white rounded-lg transition-colors"
            >
              {busy ? 'Processing…' : 'Deposit →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
