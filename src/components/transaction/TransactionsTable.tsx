"use client";

import { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MoveLeft, MoveRight } from "lucide-react";
import DatePicker from "../DatePicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { WalletSchemaType, selectedWalletState } from "@/states/wallets.atom";
import { transactionsState } from "@/states/transactions.atom";
import useAlchemyTransactionsHistory from "@/hooks/useAlchemy";
import { CustomTransaction, TransactionType } from "@/models/transaction.model";

const TransactionsTable: FC<{}> = () => {
  const [transactions, setTransactions] = useState<CustomTransaction[]>([]);
  const selectedWallet = useRecoilValue<WalletSchemaType>(selectedWalletState);
  const getAssetTransfers = useAlchemyTransactionsHistory(
    selectedWallet.address
  );

  const formatAddress = (address: string): string => {
    return address.toLowerCase() == selectedWallet.address.toLowerCase()
      ? selectedWallet.alias
      : `${address.slice(0, 5)}...${address.slice(-5)}`;
  };

  useEffect(() => {
    Promise.all([
      getAssetTransfers(TransactionType.Incoming),
      getAssetTransfers(TransactionType.Withdrawl),
    ]).then(([incoming, withdrawl]) =>
      setTransactions([...incoming, ...withdrawl])
    );
  }, []);

  return (
    <>
      <div className="flex align-center justify-between">
        <p className="font-semibold text-2xl text-primary">
          Transactions {selectedWallet?.alias && `of ${selectedWallet.alias}`}
        </p>

        <DatePicker />
      </div>
      <Table>
        <TableCaption>A list of the wallet transactions</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Datetime</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Token</TableHead>
          </TableRow>
        </TableHeader>

        {/* Conditions to show red/green depending on receive or withdraw */}
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index}>
              <TableCell className="w-min">
                {tx.transactionType === TransactionType.Incoming ? (
                  <MoveRight className="text-green-600" />
                ) : (
                  <MoveLeft className="text-red-600" />
                )}
              </TableCell>
              <TableCell>{formatAddress(tx.from)}</TableCell>
              <TableCell>{formatAddress(tx.to || "")}</TableCell>
              <TableCell>{tx.blockNum}</TableCell>
              <TableCell>{tx.asset}</TableCell>
              <TableCell
                className={`font-semibold ${
                  tx.transactionType === TransactionType.Incoming
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {`${
                  tx.transactionType === TransactionType.Incoming ? "+" : "-"
                }$${tx.value}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionsTable;
