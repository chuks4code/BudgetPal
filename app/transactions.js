import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import TransactionItem from "../components/TransactionItem";
import { useTransactionStore } from "../store/useTransactionStore";

export default function TransactionsScreen() {
  const router = useRouter();
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <View className="flex-1 bg-white dark:bg-black px-5 pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold text-black dark:text-white">
          All Transactions
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          <Text className="text-black dark:text-white">Back</Text>
        </Pressable>
      </View>

      <FlatList
        data={transactions}

         /* Gives each list item a unique key*/ 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}

         
          /*ListEmptyComponent={...}, Displays only when transactions is empty */
        ListEmptyComponent={
          <Text className="text-gray-500 dark:text-gray-400 mt-6">
            No transactions yet.
          </Text>
        }
      />
    </View>
  );
}
