interface Props {
  label: string
  value: string
  sub?: string
  accent?: 'indigo' | 'emerald' | 'amber'
}

export function TreasuryCard({ label, value, sub, accent = 'indigo' }: Props) {
  const dot = accent === 'emerald' ? 'bg-emerald-500' : accent === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <p className="text-xs text-zinc-500 font-medium">{label}</p>
      </div>
      <p className="text-2xl font-black font-mono text-white tabular-nums">{value}</p>
      {sub && <p className="text-xs text-zinc-600 mt-1">{sub}</p>}
    </div>
  )
}
