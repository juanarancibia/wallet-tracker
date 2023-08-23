"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import WalletRow from "./WalletRow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import WalletForm from "./WalletForm";
import { useRecoilValue } from "recoil";
import { walletsState } from "@/states/wallets.atom";

const WalletCards = () => {
  const walletsStateValue = useRecoilValue(walletsState);

  return (
    <Card className="w-[400px] mt-8">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <p className="text-primary">Wallets</p>

            <Dialog>
              <DialogTrigger className="ml-auto">
                <Button variant="ghost" size="icon">
                  <PlusCircle />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle>Wallets</DialogTitle>
                <DialogDescription>
                  Add a new wallet to your watchlist
                </DialogDescription>

                <WalletForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
        <CardDescription>Track wallets across chains</CardDescription>
      </CardHeader>

      <CardContent>
        {walletsStateValue.map((wallet, index) => (
          <WalletRow
            key={index}
            alias={wallet.alias}
            network={wallet.network}
            address={wallet.address}
            balance={index * 100}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default WalletCards;
