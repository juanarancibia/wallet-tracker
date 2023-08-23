import { WalletSchema } from "@/models/wallet.schema";
import { atom } from "recoil";
import * as z from "zod";
import localStorageEffect from "./localStorageEffect.util";

const WalletsStateKey = "WalletsState";

export const walletsState = atom<z.infer<typeof WalletSchema>[]>({
  key: WalletsStateKey,
  default: [],
  effects: [localStorageEffect(WalletsStateKey, () => true)],
});
