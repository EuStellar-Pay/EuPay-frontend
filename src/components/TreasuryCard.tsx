interface Props { label: string; value: string; change: string; }
export function TreasuryCard({ label, value, change }: Props) {
  return (<div className="rounded-xl border border-gray-800 bg-gray-900 p-4"><p className="text-xs text-gray-500">{label}</p><p className="text-2xl font-bold text-white">{value}</p><p className="text-xs text-emerald-400">{change}</p></div>);
}
