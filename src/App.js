import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
function App() {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState('');
    const handleConnect = (addr) => {
        setAddress(addr);
        setConnected(true);
    };
    if (!connected) {
        return _jsx(LandingPage, { onConnect: handleConnect });
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-950 text-white", children: [_jsxs("header", { className: "border-b border-gray-800 px-4 sm:px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 text-xl font-extrabold text-white", children: [_jsx("span", { className: "w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-sm", children: "\u26A1" }), "EuPay"] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "font-mono text-sm text-gray-400 hidden sm:block", children: [address.slice(0, 6), "...", address.slice(-4)] }), _jsx("button", { onClick: () => { setConnected(false); setAddress(''); }, className: "px-3 py-1.5 text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors", children: "Disconnect" })] })] }), _jsx("main", { className: "p-4 sm:p-6", children: _jsx(Dashboard, { address: address }) })] }));
}
export default App;
