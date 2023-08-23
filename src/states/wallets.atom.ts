import { WalletSchema } from "@/models/wallet.schema";
import { atom } from "recoil";
import * as z from "zod";
import localStorageEffect from "./localStorageEffect.util";

export type WalletSchemaType = z.infer<typeof WalletSchema>;

const walletsStateKey = "WalletsState";

export const walletsState = atom<WalletSchemaType[]>({
  key: walletsStateKey,
  default: [],
  effects: [localStorageEffect(walletsStateKey, () => true)],
});

const selectedWalletStateKey = "SelectedWalletState";

export const selectedWalletState = atom<WalletSchemaType>({
  key: selectedWalletStateKey,
  default: {} as WalletSchemaType,
  effects: [localStorageEffect(selectedWalletStateKey, () => true)],
});
