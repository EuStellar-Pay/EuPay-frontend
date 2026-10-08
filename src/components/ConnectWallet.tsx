import { useWallet } from '../context/WalletContext'

export function ConnectWalletButton({ className = '' }: { className?: string }) {
  const { connect, connecting, error } = useWallet()

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={connect}
        disabled={connecting}
        className={`flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${className}`}
      >
        {connecting ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Connecting…
          </>
        ) : (
          <>
            <img
              src="https://raw.githubusercontent.com/stellar/freighter/main/extension/src/assets/images/logo.svg"
              alt=""
              className="w-4 h-4"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            Connect Freighter
          </>
        )}
      </button>
      {error && <p className="text-xs text-red-400 text-center max-w-xs">{error}</p>}
    </div>
  )
}

export async function copyAddress(address: string) {
  await navigator.clipboard.writeText(address)
}
