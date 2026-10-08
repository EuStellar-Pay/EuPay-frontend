import { useState } from 'react'
import { TreasuryCard } from './TreasuryCard'
import { StreamCard } from './StreamCard'
import { EventLog } from './EventLog'
import { CreateStreamModal } from './modals/CreateStreamModal'
import { DepositModal } from './modals/DepositModal'
import { useTreasury } from '../hooks/useEmployerData'
import { useStream } from '../hooks/useStream'
import { stroopsToXlm } from '../lib/tx'

interface Props { address: string }

const DEFAULT_TOKEN = import.meta.env.VITE_XLM_TOKEN ?? ''

function StreamRow({ id, onRefresh }: { id: number; onRefresh: () => void }) {
  const { stream, loading, refresh } = useStream(id)
  if (loading) return <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-600 animate-pulse">Loading stream #{id}…</div>
  if (!stream) return <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-xs text-red-400">Stream #{id} not found</div>
  return <StreamCard stream={stream} onRefresh={() => { refresh(); onRefresh() }} />
}

export function EmployerDashboard({ address }: Props) {
  const [streamIds,       setStreamIds]       = useState<number[]>([])
  const [newIdInput,      setNewIdInput]       = useState('')
  const [showCreate,      setShowCreate]       = useState(false)
  const [showDeposit,     setShowDeposit]      = useState(false)
  const [selectedStream,  setSelectedStream]   = useState<number | null>(null)
  const [refreshKey,      setRefreshKey]       = useState(0)

  const { balance, refresh: refreshTreasury } = useTreasury(address, DEFAULT_TOKEN || null)

  function addStreamId() {
    const id = parseInt(newIdInput, 10)
    if (!isNaN(id) && id > 0 && !streamIds.includes(id)) {
      setStreamIds(prev => [...prev, id])
      setNewIdInput('')
    }
  }

  function refresh() {
    setRefreshKey(k => k + 1)
    refreshTreasury()
  }

  const balanceXlm = balance ? stroopsToXlm(balance) : '—'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Employer Dashboard</h1>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">{address.slice(0, 10)}…{address.slice(-8)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowDeposit(true)}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors"
          >
            + Deposit
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
          >
            + New Stream
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <TreasuryCard label="Treasury Balance" value={`${balanceXlm} XLM`} sub="On-chain vault" accent="emerald" />
        <TreasuryCard label="Active Streams" value={String(streamIds.length)} sub="Tracked in this session" />
        <TreasuryCard label="Network" value={import.meta.env.VITE_STELLAR_NETWORK ?? 'TESTNET'} sub="Stellar Soroban" accent="amber" />
      </div>

      {/* Stream list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-200">Payroll Streams</h2>
        </div>

        {/* Add stream by ID */}
        <div className="flex gap-2 mb-4">
          <input
            type="number" min="1"
            value={newIdInput}
            onChange={e => setNewIdInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addStreamId()}
            placeholder="Enter stream ID to track"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={addStreamId}
            className="px-4 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors"
          >
            Track
          </button>
        </div>

        {streamIds.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center">
            <p className="text-zinc-600 text-sm mb-2">No streams tracked yet</p>
            <p className="text-zinc-700 text-xs">Enter a stream ID above, or create a new stream</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={refreshKey}>
            {streamIds.map(id => (
              <div key={id} className="space-y-2">
                <StreamRow id={id} onRefresh={refresh} />
                <button
                  onClick={() => setSelectedStream(selectedStream === id ? null : id)}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {selectedStream === id ? 'Hide events ↑' : 'Show events ↓'}
                </button>
                {selectedStream === id && <EventLog streamId={id} />}
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreate && <CreateStreamModal onClose={() => setShowCreate(false)} onSuccess={refresh} />}
      {showDeposit && <DepositModal address={address} onClose={() => setShowDeposit(false)} onSuccess={refresh} />}
    </div>
  )
}
