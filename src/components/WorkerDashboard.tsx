import { useState } from 'react'
import toast from 'react-hot-toast'
import { TreasuryCard } from './TreasuryCard'
import { EventLog } from './EventLog'
import { useStream } from '../hooks/useStream'
import { useWorkerEvents } from '../hooks/useEvents'
import { useWallet } from '../context/WalletContext'
import { buildClaim } from '../lib/api'
import { signAndSubmit, stroopsToXlm } from '../lib/tx'

interface Props { address: string }

function WorkerStreamRow({ address, id, onRefresh }: { address: string; id: number; onRefresh: () => void }) {
  const { stream, loading, refresh } = useStream(id)
  const { getAuthHeaders } = useWallet()
  const [claiming, setClaiming] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (loading) return <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-600 animate-pulse">Loading stream #{id}…</div>
  if (!stream)  return <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-xs text-red-400">Stream #{id} not found</div>

  const claimable = stream.claimableAmount
  const hasEarnings = BigInt(claimable) > 0n

  async function claim() {
    setClaiming(true)
    const tid = toast.loading('Building claim transaction…')
    try {
      const headers = await getAuthHeaders()
      const { xdr, claimableAmount } = await buildClaim(address, id, headers as any)
      toast.loading('Waiting for Freighter…', { id: tid })
      const { hash } = await signAndSubmit(xdr)
      toast.success(`Claimed ${stroopsToXlm(claimableAmount)} XLM!`, { id: tid })
      refresh()
      onRefresh()
    } catch (err: any) {
      toast.error(err.message ?? 'Claim failed', { id: tid })
    } finally {
      setClaiming(false)
    }
  }

  const STATUS_COLOR: Record<string, string> = {
    Active: 'text-emerald-400', Paused: 'text-amber-400', Cancelled: 'text-red-400', Completed: 'text-zinc-400'
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="h-[2px] bg-emerald-600" />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs text-zinc-500 font-mono">Stream #{stream.id}</p>
            <p className="text-xs font-mono text-zinc-500 mt-0.5">
              from {stream.employer.slice(0, 8)}…{stream.employer.slice(-6)}
            </p>
          </div>
          <span className={`text-xs font-semibold ${STATUS_COLOR[stream.status] ?? 'text-zinc-400'}`}>
            {stream.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-[10px] text-zinc-600 mb-0.5">Earnings ready</p>
            <p className="text-lg font-black font-mono text-emerald-400 tabular-nums">
              {stroopsToXlm(claimable)} XLM
            </p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-600 mb-0.5">Rate</p>
            <p className="text-sm font-mono text-white">{stroopsToXlm(stream.ratePerSecond)} XLM/s</p>
          </div>
        </div>

        <button
          onClick={claim}
          disabled={!hasEarnings || claiming || stream.status === 'Cancelled'}
          className="w-full py-2.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          {claiming ? 'Processing…' : hasEarnings ? `Claim ${stroopsToXlm(claimable)} XLM` : 'Nothing to claim yet'}
        </button>

        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          {expanded ? 'Hide events ↑' : 'Show on-chain events ↓'}
        </button>
        {expanded && <div className="mt-3"><EventLog streamId={id} /></div>}
      </div>
    </div>
  )
}

export function WorkerDashboard({ address }: Props) {
  const [streamIds,  setStreamIds]  = useState<number[]>([])
  const [newId,      setNewId]      = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const { events: recentEvents } = useWorkerEvents(address)

  function addStream() {
    const id = parseInt(newId, 10)
    if (!isNaN(id) && id > 0 && !streamIds.includes(id)) {
      setStreamIds(prev => [...prev, id])
      setNewId('')
    }
  }

  const totalClaimable = '—' // would need all streams loaded to sum — shown per stream

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Worker Dashboard</h1>
        <p className="text-xs text-zinc-500 font-mono mt-0.5">{address.slice(0, 10)}…{address.slice(-8)}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <TreasuryCard label="Tracked Streams" value={String(streamIds.length)} sub="Streams in this session" accent="emerald" />
        <TreasuryCard label="Recent Events" value={String(recentEvents.length)} sub="On-chain activity" />
        <TreasuryCard label="Network" value={import.meta.env.VITE_STELLAR_NETWORK ?? 'TESTNET'} sub="Stellar Soroban" accent="amber" />
      </div>

      {/* Add stream */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-200 mb-3">Your Streams</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="number" min="1"
            value={newId}
            onChange={e => setNewId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addStream()}
            placeholder="Enter stream ID to track"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={addStream}
            className="px-4 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors"
          >
            Track
          </button>
        </div>

        {streamIds.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center">
            <p className="text-zinc-600 text-sm mb-1">No streams tracked</p>
            <p className="text-zinc-700 text-xs">Enter your stream ID to view earnings and claim</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={refreshKey}>
            {streamIds.map(id => (
              <WorkerStreamRow key={id} address={address} id={id} onRefresh={() => setRefreshKey(k => k + 1)} />
            ))}
          </div>
        )}
      </div>

      {/* Recent on-chain events */}
      {recentEvents.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-zinc-200 mb-3">Recent activity</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800/60">
            {recentEvents.slice(0, 10).map(ev => (
              <div key={ev.id} className="px-4 py-3 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-mono text-zinc-300">{ev.type.replace(/_/g, ' ')}</span>
                  <span className="text-xs text-zinc-600 ml-2">ledger {ev.ledger}</span>
                </div>
                <span className="text-[10px] text-zinc-700 font-mono shrink-0">
                  {ev.txHash.slice(0, 8)}…
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
