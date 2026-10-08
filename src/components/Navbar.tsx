import { useWallet } from '../context/WalletContext'

interface Props {
  role?: 'employer' | 'worker'
  onSwitchRole?: () => void
}

export function Navbar({ role, onSwitchRole }: Props) {
  const { address, disconnect } = useWallet()

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold">⚡</div>
          <span className="text-lg font-extrabold text-white tracking-tight">EuPay</span>
          {role && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              role === 'employer' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-emerald-600/20 text-emerald-400'
            }`}>
              {role}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {address && (
            <span className="hidden sm:block font-mono text-xs text-zinc-500 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
              {address.slice(0, 6)}…{address.slice(-4)}
            </span>
          )}
          {onSwitchRole && (
            <button
              onClick={onSwitchRole}
              className="text-xs font-medium text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Switch role
            </button>
          )}
          <button
            onClick={disconnect}
            className="text-xs font-semibold text-zinc-400 hover:text-red-400 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    </header>
  )
}
