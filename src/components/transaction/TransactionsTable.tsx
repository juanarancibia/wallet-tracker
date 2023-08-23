import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MoveRight } from "lucide-react";
import DatePicker from "../DatePicker";

const TransactionsTable: FC<{}> = () => {
  return (
    <>
      <div className="flex align-center justify-between">
        <p className="font-semibold text-2xl">Transactions</p>
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
          {[0, 1, 2, 3, 4, 5, 6].map((_, index) => (
            <TableRow key={index}>
              <TableCell className="w-min">
                <MoveRight className="text-green-500" />
              </TableCell>
              <TableCell>0x123...abc</TableCell>
              <TableCell>0x456...def</TableCell>
              <TableCell>18/08/2023</TableCell>
              <TableCell>USDT</TableCell>
              <TableCell className="text-green-500">+123.456,00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionsTable;
