import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useWallet } from '../../context/WalletContext'
import { buildCreateStream } from '../../lib/api'
import { signAndSubmit, xlmToStroops } from '../../lib/tx'

interface Props {
  onClose: () => void
  onSuccess: () => void
}

export function CreateStreamModal({ onClose, onSuccess }: Props) {
  const { getAuthHeaders } = useWallet()

  const [worker,   setWorker]   = useState('')
  const [token,    setToken]    = useState(import.meta.env.VITE_XLM_TOKEN ?? '')
  const [rate,     setRate]     = useState('')   // XLM/s as decimal
  const [duration, setDuration] = useState('')   // hours
  const [deposit,  setDeposit]  = useState('')   // XLM
  const [busy,     setBusy]     = useState(false)

  const STELLAR = /^G[A-Z0-9]{55}$/

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!STELLAR.test(worker))       return toast.error('Invalid worker Stellar address')
    if (!STELLAR.test(token))        return toast.error('Invalid token contract address')
    if (isNaN(parseFloat(rate)) || parseFloat(rate) <= 0)
                                     return toast.error('Rate must be a positive number')
    if (isNaN(parseInt(duration)) || parseInt(duration) <= 0)
                                     return toast.error('Duration must be a positive number')
    if (isNaN(parseFloat(deposit)) || parseFloat(deposit) <= 0)
                                     return toast.error('Deposit must be a positive number')

    setBusy(true)
    const tid = toast.loading('Building transaction…')
    try {
      const headers = await getAuthHeaders()
      const durationSec = parseInt(duration) * 3600
      const { xdr } = await buildCreateStream({
        workerAddress:   worker,
        tokenAddress:    token,
        ratePerSecond:   xlmToStroops(rate),
        durationSeconds: durationSec,
        initialDeposit:  xlmToStroops(deposit),
      }, headers as any)
      toast.loading('Waiting for Freighter…', { id: tid })
      const { hash } = await signAndSubmit(xdr)
      toast.success(`Stream created! tx ${hash.slice(0, 12)}…`, { id: tid })
      onSuccess()
      onClose()
    } catch (err: any) {
      toast.error(err.message ?? 'Failed', { id: tid })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
        <div className="h-[2px] bg-indigo-600" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-white">Create payroll stream</h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-800 transition-colors text-lg">×</button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1.5">Worker address</label>
              <input
                value={worker} onChange={e => setWorker(e.target.value)}
                placeholder="G…"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1.5">Token contract address</label>
              <input
                value={token} onChange={e => setToken(e.target.value)}
                placeholder="G… (XLM native contract)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1.5">Rate (XLM/second)</label>
                <input
                  type="number" step="0.0000001" min="0"
                  value={rate} onChange={e => setRate(e.target.value)}
                  placeholder="0.00347"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-medium block mb-1.5">Duration (hours)</label>
                <input
                  type="number" min="1"
                  value={duration} onChange={e => setDuration(e.target.value)}
                  placeholder="720"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-1.5">Initial deposit (XLM)</label>
              <input
                type="number" step="0.0000001" min="0"
                value={deposit} onChange={e => setDeposit(e.target.value)}
                placeholder="500"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {rate && duration && (
              <div className="rounded-lg bg-zinc-800/60 border border-zinc-700/50 px-3 py-2.5">
                <p className="text-xs text-zinc-500">
                  Total stream cost: <span className="text-white font-mono">{(parseFloat(rate || '0') * parseInt(duration || '0') * 3600).toFixed(4)} XLM</span>
                  {' '}&nbsp;·&nbsp; {parseInt(duration)} hours
                </p>
              </div>
            )}

            <button
              type="submit" disabled={busy}
              className="w-full py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white rounded-lg transition-colors mt-2"
            >
              {busy ? 'Processing…' : 'Create Stream →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
