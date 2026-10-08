import { useState, useEffect, useCallback } from 'react';
import { getStream, StreamData } from '../lib/api';

export type { StreamData };

export function useStream(id: number | null) {
  const [stream,  setStream]  = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (id === null) return;
    setLoading(true);
    setError(null);
    try {
      setStream(await getStream(id));
    } catch (err: any) {
      setError(err.message ?? 'Failed to load stream');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { refresh(); }, [refresh]);

  return { stream, loading, error, refresh };
}
