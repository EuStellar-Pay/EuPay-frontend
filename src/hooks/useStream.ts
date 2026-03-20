import { useState, useEffect } from 'react';
export interface Stream { id: string; worker: string; ratePerSecond: bigint; status: 'active'|'paused'|'cancelled'; }
export function useStream(streamId: string) {
  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => { setStream({ id: streamId, worker: 'Alice M.', ratePerSecond: BigInt(1_000_000), status: 'active' }); setLoading(false); }, 500); }, [streamId]);
  return { stream, loading };
}
