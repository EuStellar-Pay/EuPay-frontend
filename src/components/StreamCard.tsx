import { useState } from 'react'
import toast from 'react-hot-toast'
import { useWallet } from '../context/WalletContext'
import { buildCancelStream, buildPauseStream, buildResumeStream } from '../lib/api'
import { signAndSubmit, stroopsToXlm } from '../lib/tx'
import { StreamData } from '../hooks/useStream'

interface Props {
  stream: StreamData
  onRefresh: () => void
}

const STATUS_STYLE: Record<string, string> = {
  Active:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Paused:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  Completed: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

export function StreamCard({ stream, onRefresh }: Props) {
  const { getAuthHeaders } = useWallet()
  const [loading, setLoading] = useState<string | null>(null)

  async function doAction(
    label: string,
    buildFn: (headers: Record<string, string>) => Promise<{ xdr: string }>,
  ) {
    setLoading(label)
    const tid = toast.loading(`Building ${label} transaction…`)
    try {
      const headers = await getAuthHeaders()
      const { xdr } = await buildFn(headers as any)
      toast.loading('Waiting for Freighter…', { id: tid })
      const { hash } = await signAndSubmit(xdr)
      toast.success(`${label} confirmed`, { id: tid })
      onRefresh()
    } catch (err: any) {
      toast.error(err.message ?? `${label} failed`, { id: tid })
    } finally {
      setLoading(null)
    }
  }

  const claimableXlm = stroopsToXlm(stream.claimableAmount)
  const remainingXlm = stroopsToXlm(stream.remainingFunds)
  const rateXlm      = stroopsToXlm(stream.ratePerSecond)
  const elapsed      = stream.activeSeconds
  const total        = stream.endTime - stream.startTime
  const progress     = total > 0 ? Math.min((elapsed / total) * 100, 100) : 0

  const busy = loading !== null

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="h-[2px] bg-indigo-600" />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs text-zinc-500 font-mono mb-0.5">Stream #{stream.id}</p>
            <p className="text-sm font-mono text-zinc-300 break-all">
              {stream.worker.slice(0, 8)}…{stream.worker.slice(-6)}
            </p>
          </div>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLE[stream.status] ?? STATUS_STYLE.Completed}`}>
            {stream.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-[10px] text-zinc-600 mb-0.5">Rate</p>
            <p className="text-sm font-mono text-white">{rateXlm} XLM/s</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-600 mb-0.5">Claimable</p>
            <p className="text-sm font-mono text-emerald-400">{claimableXlm} XLM</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-600 mb-0.5">Remaining</p>
            <p className="text-sm font-mono text-zinc-300">{remainingXlm} XLM</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-600 mb-0.5">Active time</p>
            <p className="text-sm font-mono text-zinc-300">{Math.floor(elapsed / 3600)}h {Math.floor((elapsed % 3600) / 60)}m</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[10px] text-zinc-600 mt-1">{progress.toFixed(1)}% elapsed</p>
        </div>

        {stream.status !== 'Cancelled' && stream.status !== 'Completed' && (
          <div className="flex flex-wrap gap-2">
            {stream.status === 'Active' ? (
              <button
                onClick={() => doAction('Pause', h => buildPauseStream(stream.id, h))}
                disabled={busy}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 disabled:opacity-50 transition-colors"
              >
                {loading === 'Pause' ? '…' : 'Pause'}
              </button>
            ) : (
              <button
                onClick={() => doAction('Resume', h => buildResumeStream(stream.id, h))}
                disabled={busy}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
              >
                {loading === 'Resume' ? '…' : 'Resume'}
              </button>
            )}
            <button
              onClick={() => doAction('Cancel', h => buildCancelStream(stream.id, h))}
              disabled={busy}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
            >
              {loading === 'Cancel' ? '…' : 'Cancel'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
