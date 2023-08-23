import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { selectedWalletState } from "@/states/wallets.atom";

interface WalletRowProps {
  alias: string;
  network: string;
  balance: number;
  address: string;
}

const WalletRow: FC<WalletRowProps> = ({
  alias,
  network,
  balance,
  address,
}) => {
  const setSelectedWalletState = useSetRecoilState(selectedWalletState);

  return (
    <div
      className="flex items-center cursor-pointer my-2 px-4 py-2 rounded hover:bg-slate-100"
      onClick={() => setSelectedWalletState({ alias, network, address })}
    >
      <Avatar className="h-12 w-12 bg-slate-200">
        <AvatarImage
          className="p-2"
          src="/wallet.png"
          alt="wallet-icon"
        ></AvatarImage>
        <AvatarFallback>Wallet</AvatarFallback>
      </Avatar>

      <div className="ml-5">
        <p className="text-sm font-semibold leading-none">{alias}</p>
        <p className="text-sm text-muted-foreground">{network}</p>
      </div>

      {/* TODO: Format number, red/green */}
      <div className="ml-auto font-medium">+${balance.toString()}</div>
    </div>
  );
};

export default WalletRow;
