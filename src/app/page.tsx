import DatePicker from "@/components/DatePicker";
import TransactionsTable from "@/components/transaction/TransactionsTable";
import WalletForm from "@/components/wallet/WalletForm";
import WalletCards from "@/components/wallet/WalletsCard";

export default function Home() {
  return (
    <main className="container">
      <p className="text-4xl font-bold mt-5">Wallet Tracker</p>
      <div className="flex flex-col gap-12">
        <WalletCards />

        <TransactionsTable />
      </div>
    </main>
  );
}
