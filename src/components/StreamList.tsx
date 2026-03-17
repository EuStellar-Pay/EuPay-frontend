const STREAMS = [{id:'STR-001',worker:'Alice M.',rate:'10 XLM/hr',status:'Active',earned:'240 XLM'},{id:'STR-002',worker:'Bob K.',rate:'8 XLM/hr',status:'Active',earned:'192 XLM'}];
export function StreamList() {
  return (<div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden"><div className="px-4 py-3 border-b border-gray-800"><h3 className="text-sm font-semibold text-gray-200">Payroll Streams</h3></div><table className="w-full text-sm">{STREAMS.map(s => <tr key={s.id}><td className="px-4 py-3 text-gray-400">{s.id}</td><td className="px-4 py-3 text-white">{s.worker}</td><td className="px-4 py-3 text-indigo-400">{s.rate}</td><td className="px-4 py-3 text-gray-300">{s.earned}</td></tr>)}</table></div>);
}
