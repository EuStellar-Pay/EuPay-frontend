import { useStreamEvents } from '../hooks/useEvents'

interface Props {
  streamId: number
}

const TYPE_COLOR: Record<string, string> = {
  stream_created:   'text-indigo-400',
  stream_funded:    'text-emerald-400',
  claim:            'text-emerald-400',
  pause_stream:     'text-amber-400',
  resume_stream:    'text-blue-400',
  cancel_stream:    'text-red-400',
  admin_cancel:     'text-red-400',
}

export function EventLog({ streamId }: Props) {
  const { events, loading, error, nextCursor, loadMore } = useStreamEvents(streamId)

  if (loading && events.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs text-zinc-500">Loading events…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-xs text-red-400">Failed to load events: {error}</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">On-chain events</h3>
        <span className="text-xs text-zinc-600">{events.length} events</span>
      </div>

      {events.length === 0 ? (
        <p className="px-4 py-6 text-xs text-zinc-600 text-center">No events found for this stream</p>
      ) : (
        <div className="divide-y divide-zinc-800/60">
          {events.map(ev => (
            <div key={ev.id} className="px-4 py-3 flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-mono font-semibold ${TYPE_COLOR[ev.type] ?? 'text-zinc-400'}`}>
                    {ev.type.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[10px] text-zinc-600">ledger {ev.ledger}</span>
                </div>
                <p className="text-[10px] font-mono text-zinc-600 mt-0.5 truncate">
                  tx: {ev.txHash.slice(0, 12)}…{ev.txHash.slice(-8)}
                </p>
                <p className="text-[10px] text-zinc-700 mt-0.5">
                  {new Date(ev.closedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {nextCursor && (
        <div className="px-4 py-3 border-t border-zinc-800">
          <button
            onClick={loadMore}
            disabled={loading}
            className="text-xs text-indigo-400 hover:text-indigo-300 disabled:opacity-50 font-medium"
          >
            {loading ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}
