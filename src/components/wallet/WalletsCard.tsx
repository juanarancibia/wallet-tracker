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

const WalletCards = () => {
  return (
    <Card className="w-[400px] mt-8">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <p>Wallets</p>
            <Button className="ml-auto" variant="ghost" size="icon">
              <PlusCircle />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>Track wallets across chains</CardDescription>
      </CardHeader>

      <CardContent>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <WalletRow
            key={index}
            alias="DeFi Argentina"
            network="Polygon"
            balance={_ * 100}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default WalletCards;
