import WalletForm from "@/components/wallet/WalletForm";
import WalletCards from "@/components/wallet/WalletsCard";

export default function Home() {
  return (
    <main className="container">
      <p className="text-4xl font-bold mt-5">Wallet Tracker</p>
      <WalletCards />
    </main>
  );
}
