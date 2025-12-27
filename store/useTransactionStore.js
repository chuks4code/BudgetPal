import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

export const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (txn) =>
        set((state) => ({
          transactions: [txn, ...state.transactions],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      clearAll: () => set({ transactions: [] }), // optional simple reset
    }),
    {
      name: "transactions-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)