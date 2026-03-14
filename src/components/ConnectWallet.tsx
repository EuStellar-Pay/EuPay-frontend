interface Props { connected: boolean; address: string; onConnect: (address: string) => void; }
export function ConnectWallet({ connected, address, onConnect }: Props) {
  return connected ? <span className="font-mono text-sm">{address.slice(0,6)}...{address.slice(-4)}</span>
    : <button onClick={() => onConnect('MOCK')} className="bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium text-white">Connect Wallet</button>;
}
