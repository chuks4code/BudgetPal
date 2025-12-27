import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { colorScheme } from "nativewind";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light", // "light" | "dark"

      setTheme: (theme) => {
        set({ theme });
        colorScheme.set(theme); //  tells NativeWind to switch
      },

      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        set({ theme: next });
        colorScheme.set(next); //  tells NativeWind to switch
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
