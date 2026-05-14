import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TreasuryCard({ label, value, change }) {
    return (_jsxs("div", { className: "rounded-xl border border-gray-800 bg-gray-900 p-4", children: [_jsx("p", { className: "text-xs text-gray-500", children: label }), _jsx("p", { className: "text-2xl font-bold text-white", children: value }), _jsx("p", { className: "text-xs text-emerald-400", children: change })] }));
}
