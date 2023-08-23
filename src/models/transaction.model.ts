import { Network } from "alchemy-sdk";

export interface CustomTransaction {
  hash?: string;
  asset: string | null;
  category: string;
  value: number | null;
  from: string;
  to: string | null;
  timestamp?: string;
  blockNum: string;
  network?: Network;
  transactionType: TransactionType;
}

export enum TransactionType {
  Incoming,
  Withdrawl,
}
