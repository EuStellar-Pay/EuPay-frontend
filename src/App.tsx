import { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { LandingPage } from './components/LandingPage'

function App() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress]     = useState('')

  const handleConnect = (addr: string) => {
    setAddress(addr)
    setConnected(true)
  }

  if (!connected) {
    return <LandingPage onConnect={handleConnect} />
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-sm">⚡</span>
          EuPay
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-gray-400 hidden sm:block">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={() => { setConnected(false); setAddress('') }}
            className="px-3 py-1.5 text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        </div>
      </header>
      <main className="p-4 sm:p-6">
        <Dashboard address={address} />
      </main>
    </div>
  )
}

export default App
