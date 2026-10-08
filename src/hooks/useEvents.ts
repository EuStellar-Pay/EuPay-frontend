import { useState, useEffect, useCallback } from 'react';
import { getStreamEvents, getWorkerEvents, StreamEvent } from '../lib/api';

export type { StreamEvent };

export function useStreamEvents(streamId: number | null) {
  const [events,     setEvents]     = useState<StreamEvent[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const load = useCallback(async (cursor?: string) => {
    if (streamId === null) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getStreamEvents(streamId, cursor);
      setEvents(prev => cursor ? [...prev, ...data.events] : data.events);
      setNextCursor(data.nextCursor);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [streamId]);

  useEffect(() => { load(); }, [load]);

  const loadMore = () => { if (nextCursor) load(nextCursor); };

  return { events, nextCursor, loading, error, loadMore, refresh: () => load() };
}

export function useWorkerEvents(address: string | null) {
  const [events,     setEvents]     = useState<StreamEvent[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const load = useCallback(async (cursor?: string) => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getWorkerEvents(address, cursor);
      setEvents(prev => cursor ? [...prev, ...data.events] : data.events);
      setNextCursor(data.nextCursor);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => { load(); }, [load]);

  const loadMore = () => { if (nextCursor) load(nextCursor); };

  return { events, nextCursor, loading, error, loadMore, refresh: () => load() };
}
