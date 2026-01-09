import AsyncStorage from '@react-native-async-storage/async-storage';
/*AsyncStorage  ->  Saves data on the device permanently*/

import { create } from 'zustand';
/* Creates a global store, Any component can access it*/

import { persist, createJSONStorage } from "zustand/middleware";
/* Automatically saves Zustand state to storage Restores it when the app reloadst*/

export const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: [],
      /* Initial state An empty array of transactions*/

      addTransaction: (txn) =>
        set((state) => ({
          transactions: [txn, ...state.transactions],
        })),
        /* filter and adds the new trans. at the top*/

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      clearAll: () => set({ transactions: [] }), 
      /* Optional=> Empties transactions Storage also cleared (for that key)*/
    }),
    {
      name: "transactions-storage",
      storage: createJSONStorage(() => AsyncStorage),
      /* name → key used in AsyncStorage, storage → tells Zustand to use AsyncStorage*/
    }
  )
)