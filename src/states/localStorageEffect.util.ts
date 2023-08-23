import { AtomEffect } from "recoil";

const storage = typeof window !== "undefined" ? window.localStorage : null;

const localStorageEffect: (
  key: string,
  storageValueIsValid: (savedValue: string) => boolean
) => AtomEffect<any> =
  (key, storageValueIsValid) =>
  ({ setSelf, onSet }) => {
    if (storage) {
      const savedValue = storage.getItem(key);

      if (savedValue != null && storageValueIsValid(savedValue)) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export default localStorageEffect;
