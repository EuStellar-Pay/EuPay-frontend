import {
  TransactionBuilder,
  Networks,
  Transaction,
  FeeBumpTransaction,
} from '@stellar/stellar-sdk';
import {
  isConnected,
  signTransaction,
} from '@stellar/freighter-api';

const HORIZON = import.meta.env.VITE_HORIZON_URL ?? 'https://horizon-testnet.stellar.org';
const NETWORK  = import.meta.env.VITE_STELLAR_NETWORK ?? 'TESTNET';

const PASSPHRASE: Record<string, string> = {
  TESTNET:   Networks.TESTNET,
  PUBLIC:    Networks.PUBLIC,
  FUTURENET: Networks.FUTURENET,
};

export interface TxResult {
  hash: string;
  ledger: number;
}

export class TxError extends Error {
  constructor(message: string, public detail?: unknown) {
    super(message);
    this.name = 'TxError';
  }
}

/**
 * Signs an unsigned XDR envelope with Freighter and submits to Horizon.
 * Returns the tx hash on success.
 */
export async function signAndSubmit(xdr: string): Promise<TxResult> {
  const connected = await isConnected();
  if (!connected) throw new TxError('Freighter is not connected');

  const passphrase = PASSPHRASE[NETWORK] ?? Networks.TESTNET;

  // Freighter returns a signed XDR string
  const signedXdr = await signTransaction(xdr, {
    networkPassphrase: passphrase,
  });

  if (!signedXdr) throw new TxError('Freighter returned empty signature');

  // Submit to Horizon
  const response = await fetch(`${HORIZON}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ tx: signedXdr }),
  });

  const body = await response.json();

  if (!response.ok) {
    const detail = body?.extras?.result_codes ?? body;
    throw new TxError(body?.title ?? `Submission failed (${response.status})`, detail);
  }

  return { hash: body.hash, ledger: body.ledger };
}

/** Formats a stroops bigint to a readable XLM string */
export function stroopsToXlm(stroops: string | number | bigint): string {
  const n = typeof stroops === 'bigint' ? stroops : BigInt(String(stroops));
  const whole    = n / 10_000_000n;
  const fraction = n % 10_000_000n;
  return `${whole}.${fraction.toString().padStart(7, '0').replace(/0+$/, '') || '0'}`;
}

/** Converts an XLM decimal string to stroops */
export function xlmToStroops(xlm: string): string {
  const [whole, frac = ''] = xlm.split('.');
  const padded = frac.padEnd(7, '0').slice(0, 7);
  return String(BigInt(whole) * 10_000_000n + BigInt(padded));
}
