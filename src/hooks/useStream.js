import { useState, useEffect } from 'react';
export function useStream(streamId) {
    const [stream, setStream] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => { setTimeout(() => { setStream({ id: streamId, worker: 'Alice M.', ratePerSecond: BigInt(1000000), status: 'active' }); setLoading(false); }, 500); }, [streamId]);
    return { stream, loading };
}
