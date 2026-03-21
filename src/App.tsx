import { useState } from 'react'; import { Dashboard } from './components/Dashboard'; import { ConnectWallet } from './components/ConnectWallet';
function App() {
  const [connected, setConnected] = useState(false); const [address, setAddress] = useState('');
  return (<div className="min-h-screen bg-gray-950 text-white"><header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between"><h1 className="text-xl font-bold text-indigo-400">EuPay</h1><ConnectWallet connected={connected} address={address} onConnect={(a) => { setAddress(a); setConnected(true); }} /></header><main className="p-6">{connected ? <Dashboard address={address} /> : <div className="text-center py-20 text-gray-400"><p className="text-2xl font-semibold mb-2">Payroll Streaming on Stellar</p><p>Connect your wallet to get started.</p></div>}</main></div>);
}
export default App;
