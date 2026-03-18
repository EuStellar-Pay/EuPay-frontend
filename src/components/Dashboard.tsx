import { TreasuryCard } from './TreasuryCard'; import { StreamList } from './StreamList';
interface Props { address: string; }
export function Dashboard({ address }: Props) {
  return (<div className="max-w-6xl mx-auto space-y-6"><h2 className="text-lg font-semibold text-gray-200">Welcome, <span className="text-indigo-400 font-mono">{address.slice(0,8)}...</span></h2><div className="grid grid-cols-3 gap-4"><TreasuryCard label="Treasury Balance" value="12,500 XLM" change="+2.4%" /><TreasuryCard label="Active Streams" value="8" change="+1" /><TreasuryCard label="Total Disbursed" value="48,200 XLM" change="+320 XLM" /></div><StreamList /></div>);
}
