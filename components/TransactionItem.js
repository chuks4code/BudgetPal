import { View, Text, Pressable, Alert } from "react-native";
import { useTransactionStore } from "../store/useTransactionStore";
import { Ionicons } from "@expo/vector-icons";

export default function TransactionItem({ item }) {
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );

  function confirmDelete() {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(item.id),
        },
      ]
    );
  }

  const sign = item.type === "income" ? "+" : "-";

  return (
    <View className="border border-gray-500 dark:border-gray-700 bg-white dark:bg-black rounded-lg p-2 mb-2">
      {/* item.category */}
      <View className="flex-row justify-between items-center">
        <Text className="font-semibold text-black dark:text-white">
          {item.category}
        </Text>

        {/* Delete icon */}
        <Pressable
          onPress={confirmDelete}
          hitSlop={10} // makes small icon easier to tap
        >
          <Ionicons name="trash-outline" size={20} color="#DC2626" />
        </Pressable>
      </View>

      {/* Amount */}
      <Text
        className={`font-semibold mt-1 ${
          item.type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {sign}${item.amount}
      </Text>

      {/* Income or Expense plus date text */}
      <Text className="text-black dark:text-white text-sm mt-1">
        {item.type.toUpperCase()} • {item.date.split("T")[0]}
      </Text>

      {/* Note */}
      {item.note ? (
        <Text className="text-black dark:text-white mt-1">
          {item.note}
        </Text>
      ) : null}
    </View>
  );
}
