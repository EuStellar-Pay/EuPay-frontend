import { useState } from 'react'
import { useWallet } from './context/WalletContext'
import { LandingPage } from './components/LandingPage'
import { EmployerDashboard } from './components/EmployerDashboard'
import { WorkerDashboard } from './components/WorkerDashboard'
import { Navbar } from './components/Navbar'

type Role = 'employer' | 'worker'

export default function App() {
  const { connected, address } = useWallet()
  const [role, setRole] = useState<Role | null>(null)

  if (!connected) {
    return <LandingPage />
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">How are you using EuPay?</h2>
              <p className="text-zinc-400 mt-1 text-sm">Choose your role to continue</p>
            </div>
            <button
              onClick={() => setRole('employer')}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-indigo-500 p-5 text-left transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center text-xl group-hover:bg-indigo-600/30 transition-colors">💼</div>
                <div>
                  <p className="font-semibold text-white">Employer</p>
                  <p className="text-sm text-zinc-400 mt-0.5">Create streams, manage treasury, pay workers</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setRole('worker')}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-emerald-500 p-5 text-left transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center text-xl group-hover:bg-emerald-600/30 transition-colors">⚡</div>
                <div>
                  <p className="font-semibold text-white">Worker</p>
                  <p className="text-sm text-zinc-400 mt-0.5">View earnings, claim payments from your streams</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar role={role} onSwitchRole={() => setRole(null)} />
      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {role === 'employer'
          ? <EmployerDashboard address={address!} />
          : <WorkerDashboard address={address!} />
        }
      </main>
    </div>
  )
}
