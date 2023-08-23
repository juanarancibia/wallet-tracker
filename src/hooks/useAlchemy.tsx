import { CustomTransaction, TransactionType } from "@/models/transaction.model";
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";

const useAlchemyTransactionsHistory = (
  address: string,
  network: Network = Network.MATIC_MAINNET
): ((transactionType: TransactionType) => Promise<CustomTransaction[]>) => {
  const polygonConfig = {
    apiKey: "28V94dZPmWS1rhwqI8ULPt2SELEH7K8x",
    network: network,
  };

  const polygonAlchemy = new Alchemy(polygonConfig);

  return async (transactionType: TransactionType) =>
    await getAssetTransfers(transactionType, polygonAlchemy, address, network);
};

const getAssetTransfers = async (
  transactionType: TransactionType,
  alchemyInstance: Alchemy,
  address: string,
  network: Network
): Promise<CustomTransaction[]> => {
  return (
    await alchemyInstance.core.getAssetTransfers({
      toAddress:
        transactionType === TransactionType.Incoming ? address : undefined,
      fromAddress:
        transactionType === TransactionType.Withdrawl ? address : undefined,
      fromBlock: "0x0",
      category: [AssetTransfersCategory.ERC20],
      excludeZeroValue: true,
    })
  ).transfers
    .filter((tx) => ["USDC", "USDT", "MATIC", "DAI"].includes(tx.asset || ""))
    .map((tx) => ({
      ...tx,
      network: network,
      transactionType,
    })) as CustomTransaction[];
};

export default useAlchemyTransactionsHistory;
