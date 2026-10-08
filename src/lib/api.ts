const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, body.error ?? `HTTP ${res.status}`);
  return body as T;
}

// ── Auth ──────────────────────────────────────────────────────────
export function getNonce(address: string): Promise<{ nonce: string; expiresInSeconds: number }> {
  return req(`/api/auth/nonce/${address}`);
}

// ── Streams ───────────────────────────────────────────────────────
export interface StreamData {
  id: number;
  employer: string;
  worker: string;
  token: string;
  ratePerSecond: string;
  startTime: number;
  endTime: number;
  lastClaimAt: number;
  pausedAt: number;
  pauseDuration: number;
  status: 'Active' | 'Paused' | 'Cancelled' | 'Completed';
  claimableAmount: string;
  remainingFunds: string;
  activeSeconds: number;
}

export function getStream(id: number): Promise<StreamData> {
  return req(`/api/streams/${id}`);
}

export function getClaimable(id: number): Promise<{ streamId: number; claimableAmount: string }> {
  return req(`/api/streams/${id}/claimable`);
}

export interface CreateStreamPayload {
  workerAddress: string;
  tokenAddress: string;
  ratePerSecond: string;
  durationSeconds: number;
  initialDeposit: string;
}

export function buildCreateStream(payload: CreateStreamPayload, headers: Record<string, string>): Promise<{ xdr: string }> {
  return req('/api/streams', { method: 'POST', body: JSON.stringify(payload), headers });
}

export function buildCancelStream(id: number, headers: Record<string, string>): Promise<{ xdr: string }> {
  return req(`/api/streams/${id}`, { method: 'DELETE', headers });
}

export function buildPauseStream(id: number, headers: Record<string, string>): Promise<{ xdr: string }> {
  return req(`/api/streams/${id}/pause`, { method: 'POST', headers });
}

export function buildResumeStream(id: number, headers: Record<string, string>): Promise<{ xdr: string }> {
  return req(`/api/streams/${id}/resume`, { method: 'POST', headers });
}

export function buildFundStream(id: number, amount: string, headers: Record<string, string>): Promise<{ xdr: string }> {
  return req(`/api/streams/${id}/fund`, { method: 'POST', body: JSON.stringify({ amount }), headers });
}

// ── Workers ───────────────────────────────────────────────────────
export function getWorkerStream(address: string, id: number): Promise<StreamData> {
  return req(`/api/workers/${address}/streams/${id}`);
}

export function buildClaim(address: string, streamId: number, headers: Record<string, string>): Promise<{ xdr: string; claimableAmount: string }> {
  return req(`/api/workers/${address}/claim`, { method: 'POST', body: JSON.stringify({ streamId }), headers });
}

// ── Employers ─────────────────────────────────────────────────────
export function getTreasuryBalance(address: string, token: string): Promise<{ balance: string }> {
  return req(`/api/employers/${address}/treasury?token=${token}`);
}

export function getTreasuryAllocation(address: string, streamId: number, token: string): Promise<{ allocation: string }> {
  return req(`/api/employers/${address}/treasury/allocation?streamId=${streamId}&token=${token}`);
}

export function buildDeposit(address: string, tokenAddress: string, amount: string, headers: Record<string, string>): Promise<{ xdr: string }> {
  return req(`/api/employers/${address}/treasury/deposit`, { method: 'POST', body: JSON.stringify({ tokenAddress, amount }), headers });
}

export function buildAllocate(address: string, streamId: number, tokenAddress: string, amount: string, headers: Record<string, string>): Promise<{ xdr: string }> {
  return req(`/api/employers/${address}/treasury/allocate`, { method: 'POST', body: JSON.stringify({ streamId, tokenAddress, amount }), headers });
}

// ── Events ────────────────────────────────────────────────────────
export interface StreamEvent {
  id: string;
  txHash: string;
  ledger: number;
  closedAt: string;
  type: string;
  streamId: number | null;
  workerAddress: string | null;
  payload: unknown;
}

export function getStreamEvents(id: number, cursor?: string): Promise<{ events: StreamEvent[]; nextCursor: string | null }> {
  const qs = cursor ? `?cursor=${cursor}` : '';
  return req(`/api/streams/${id}/events${qs}`);
}

export function getWorkerEvents(address: string, cursor?: string): Promise<{ events: StreamEvent[]; nextCursor: string | null }> {
  const qs = cursor ? `?cursor=${cursor}` : '';
  return req(`/api/workers/${address}/events${qs}`);
}
