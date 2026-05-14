import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const STREAMS = [{ id: 'STR-001', worker: 'Alice M.', rate: '10 XLM/hr', status: 'Active', earned: '240 XLM' }, { id: 'STR-002', worker: 'Bob K.', rate: '8 XLM/hr', status: 'Active', earned: '192 XLM' }];
export function StreamList() {
    return (_jsxs("div", { className: "rounded-xl border border-gray-800 bg-gray-900 overflow-hidden", children: [_jsx("div", { className: "px-4 py-3 border-b border-gray-800", children: _jsx("h3", { className: "text-sm font-semibold text-gray-200", children: "Payroll Streams" }) }), _jsx("table", { className: "w-full text-sm", children: STREAMS.map(s => _jsxs("tr", { children: [_jsx("td", { className: "px-4 py-3 text-gray-400", children: s.id }), _jsx("td", { className: "px-4 py-3 text-white", children: s.worker }), _jsx("td", { className: "px-4 py-3 text-indigo-400", children: s.rate }), _jsx("td", { className: "px-4 py-3 text-gray-300", children: s.earned })] }, s.id)) })] }));
}
