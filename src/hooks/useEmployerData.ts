import { useState, useEffect, useCallback } from 'react';
import { getTreasuryBalance, StreamData } from '../lib/api';

// Employer dashboard: tracks multiple stream IDs and treasury balance.
// Stream IDs come from the employer — the backend doesn't have a
// "list streams by employer" endpoint (events can be used for discovery).
// For now the employer provides their known stream IDs; useEvents handles discovery.

export function useTreasury(address: string | null, tokenAddress: string | null) {
  const [balance,  setBalance]  = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!address || !tokenAddress) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getTreasuryBalance(address, tokenAddress);
      setBalance(data.balance);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load treasury');
    } finally {
      setLoading(false);
    }
  }, [address, tokenAddress]);

  useEffect(() => { refresh(); }, [refresh]);
  return { balance, loading, error, refresh };
}
