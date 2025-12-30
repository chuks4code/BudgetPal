import { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { colorScheme } from "nativewind";
import { useRouter } from "expo-router";
import AddTransaction from "../components/AddTransaction";
import TransactionItem from "../components/TransactionItem";
import SpendingSummary from "../components/SpendingSummary";
import { useTransactionStore } from "../store/useTransactionStore";
import { useThemeStore } from "../store/useThemeStore";

function monthKey(dateObj) {
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[,"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCSV(transactions) {
  const header = ["Date", "Type", "Category", "Amount", "Note"];
  const rows = transactions.map((t) => [
    new Date(t.date).toISOString().split("T")[0],
    t.type,
    t.category,
    t.amount,
    t.note || "",
  ]);

  return [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");
}

export default function HomeScreen() {
  const router = useRouter();
  const transactions = useTransactionStore((state) => state.transactions);

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  //  Keep NativeWind in sync with stored theme
  useEffect(() => {
    colorScheme.set(theme);
  }, [theme]);

  const [selectedMonth, setSelectedMonth] = useState(() => new Date());
  const selectedKey = monthKey(selectedMonth);

  /*Keeps only transactions from a selected month
    Recalculates the list only when needed for performance*/
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => monthKey(new Date(t.date)) === selectedKey);
  }, [transactions, selectedKey]);

  
  {/* .filter() → “keep items that pass a test” → returns array
    .reduce() → “combine all items into one value” → returns single value */}
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const balance = totalIncome - totalExpense;

  function goPrevMonth() {
    const d = new Date(selectedMonth);
    d.setMonth(d.getMonth() - 1);
    setSelectedMonth(d);
  }

  function goNextMonth() {
    const d = new Date(selectedMonth);
    d.setMonth(d.getMonth() + 1);
    setSelectedMonth(d);
  }

  async function exportCSV() {
    try {
      if (!filteredTransactions.length) {
        Alert.alert("Nothing to export", "No transactions for this month.");
        return;
      }

      const csv = toCSV(filteredTransactions);
      const fileName = `budgetpal-${selectedKey}.csv`;
      const fileUri = FileSystem.documentDirectory + fileName;

       console.log("FileSystem.EncodingType =", FileSystem.EncodingType);


      await FileSystem.writeAsStringAsync(fileUri, csv, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert("Saved CSV", `Saved to:\n${fileUri}`);
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: "Export transactions CSV",
        UTI: "public.comma-separated-values-text",
      });
    } catch (e) {
      Alert.alert("Export failed", String(e?.message || e));
    }
  }

  return (
    <View className="flex-1 bg-white dark:bg-black px-5 pt-8 mt-9">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-2xl font-bold text-black dark:text-white">
          💰 BudgetPal
        </Text>

        {/* gap-2 → add 8px of space between all direct children of a flex container */}
        <View className="flex-row gap-2">
          <Pressable
            onPress={toggleTheme}
            className="px-3 py-2 rounded-lg bg-black dark:bg-white"
          >
            <Text className="text-white dark:text-black font-semibold">
              {theme === "dark" ? "Light" : "Dark"}
            </Text>
          </Pressable>

          <Pressable
            onPress={exportCSV}
            className="px-3 py-2 rounded-lg bg-black dark:bg-white"
          >
            <Text className="text-white dark:text-black font-semibold">
              Export CSV
            </Text>
          </Pressable>
        </View>
      </View>


       {/*///////////////////////////////////////////////////////////////////////////*/}
      {/* Month Filter */}
      <View className="flex-row items-center justify-between mb-2">

        <Pressable
          onPress={goPrevMonth}
          className="px-3 py-2 rounded-lg border border-gray-500 dark:border-gray-700"
        >
          <Text className="text-black dark:text-white">← Prev</Text>
        </Pressable>

        <Text className="font-semibold text-black dark:text-white">
          {selectedMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>

        <Pressable
          onPress={goNextMonth}
          className="px-3 py-2 rounded-lg border border-gray-500 dark:border-gray-700"
        >
          <Text className="text-black dark:text-white">Next →</Text>
        </Pressable>
      </View>


        {/*///////////////////////////////////////////////////////////////////////////*/}
        {/*View All Transactions */}
      <View className="border-gray-600 mb-2 ">

          <Pressable
             onPress={() => router.push("/transactions")}
              className="border border-gray-500 dark:border-gray-700 rounded-lg py-2 items-center "
>
              <Text className="text-black dark:text-white font-semibold">
                 View All Transactions
              </Text>
        </Pressable>

      </View>

        {/*///////////////////////////////////////////////////////////////////////////*/}
      {/* Bal selected by month/ total section */}
      <View className="border border-gray-500 dark:border-gray-700 bg-white dark:bg-black rounded-xl p-3 mb-2">
        <Text className="text-gray-600 dark:text-gray-300">
          Balance (selected month)
        </Text>

        <Text className="text-3xl font-extrabold mt-1 text-black dark:text-white">
          ${balance}
        </Text>


                      <View className="flex-row justify-between mt-3">
            <Text className="text-green-600 font-extrabold text-lg">
              Total Income: ${totalIncome}
            </Text>
          
            <Text className="text-red-600 font-semibold text-base">
              Expense: ${totalExpense}
            </Text>
          </View>

        {/* <View className="flex-row justify-between mt-3">
          <Text className="text-green-600 font-semibold">
            Income: ${totalIncome}
          </Text>
          <Text className="text-red-600 font-semibold">
            Expense: ${totalExpense}
          </Text>
        </View> */}
      </View>


      {/*//////////////////////////////////////////////////////////////////////////////////////////////////////// */} 
      {/* SpendingSummary component called */}
      <SpendingSummary transactions={filteredTransactions} />

      {/*//////////////////////////////////////////////////////////////////////////////////////////////////////// */} 
      {/* AddTransaction component called */}
      <AddTransaction />

    </View>
  );
}
