import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { TreasuryCard } from './TreasuryCard';
import { StreamList } from './StreamList';
export function Dashboard({ address }) {
    return (_jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("h2", { className: "text-lg font-semibold text-gray-200", children: ["Welcome, ", _jsxs("span", { className: "text-indigo-400 font-mono", children: [address.slice(0, 8), "..."] })] }), _jsxs("div", { className: "grid grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(TreasuryCard, { label: "Treasury Balance", value: "12,500 XLM", change: "+2.4%" }), _jsx(TreasuryCard, { label: "Active Streams", value: "8", change: "+1" }), _jsx(TreasuryCard, { label: "Total Disbursed", value: "48,200 XLM", change: "+320 XLM" })] }), _jsx(StreamList, {})] }));
}
