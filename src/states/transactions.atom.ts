import { CustomTransaction } from "@/models/transaction.model";
import { atom } from "recoil";
import localStorageEffect from "./localStorageEffect.util";

const transactionsStateKey = "TransactionsState";

export const transactionsState = atom<CustomTransaction[]>({
  key: transactionsStateKey,
  default: [],
  effects: [localStorageEffect(transactionsStateKey, () => true)],
});
