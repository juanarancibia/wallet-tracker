"use client";

import useAlchemyTransactionsHistory from "@/hooks/useAlchemy";
import { CustomTransaction, TransactionType } from "@/models/transaction.model";
import { WalletSchemaType, selectedWalletState } from "@/states/wallets.atom";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DatePicker from "../DatePicker";
import DataTable from "../ui/DataTable";
import { MoveLeft, MoveRight } from "lucide-react";

const TransactionsTable = () => {
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

  const columns: ColumnDef<CustomTransaction>[] = [
    {
      accessorKey: "",
      header: "",
      id: "arrow",
      cell: ({ row }) => {
        return row.original.transactionType === TransactionType.Incoming ? (
          <MoveRight className="text-green-600" />
        ) : (
          <MoveLeft className="text-red-600" />
        );
      },
    },
    {
      accessorKey: "from",
      header: "From",
      cell: ({ row }) => formatAddress(row.getValue("from")),
    },
    {
      accessorKey: "to",
      header: "To",
      cell: ({ row }) => formatAddress(row.getValue("to")),
    },
    {
      accessorKey: "blockNum",
      header: "Timestamp",
    },
    {
      accessorKey: "asset",
      header: "Token",
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => (
        <p
          className={`font-semibold ${
            row.original.transactionType === TransactionType.Incoming
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {`${
            row.original.transactionType === TransactionType.Incoming
              ? "+"
              : "-"
          }$${row.getValue("value")}`}
        </p>
      ),
    },
  ];

  //transactions.map((tx, index) => (
  //   <TableRow key={index}>
  //     <TableCell className="w-min">
  //
  //     </TableCell>
  //     <TableCell>{formatAddress(tx.from)}</TableCell>
  //     <TableCell>{formatAddress(tx.to || "")}</TableCell>
  //     <TableCell>{tx.blockNum}</TableCell>
  //     <TableCell>{tx.asset}</TableCell>
  //     <TableCell
  //       className={`font-semibold ${
  //         tx.transactionType === TransactionType.Incoming
  //           ? "text-green-600"
  //           : "text-red-600"
  //       }`}
  //     >
  //       {`${
  //         tx.transactionType === TransactionType.Incoming ? "+" : "-"
  //       }$${tx.value}`}
  //     </TableCell>
  //   </TableRow>
  // ))}

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
      <DataTable
        columns={columns}
        data={transactions}
        tableCaption="A list of the wallet transactions"
      ></DataTable>
    </>
  );
};

export default TransactionsTable;
