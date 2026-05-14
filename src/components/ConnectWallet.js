import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function ConnectWallet({ connected, address, onConnect }) {
    return connected ? _jsxs("span", { className: "font-mono text-sm", children: [address.slice(0, 6), "...", address.slice(-4)] })
        : _jsx("button", { onClick: () => onConnect('MOCK'), className: "bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium text-white", children: "Connect Wallet" });
}
// Copy address to clipboard helper
export async function copyAddress(address) { await navigator.clipboard.writeText(address); }
