import { useState } from "react";
import { Pressable, Text, TextInput, View, ScrollView } from "react-native";
import { useThemeStore } from "../store/useThemeStore";
import { useTransactionStore } from "../store/useTransactionStore";
import { useRouter } from "expo-router";


const CATEGORIES = ["Food", "Rent", "Transport", "Bills", "Fun", "Other"];

export default function AddTransaction() {
   const router = useRouter();
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const theme = useThemeStore((s) => s.theme);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");
  const [errornote, setErrornote] = useState("");


  function submitHandler() {
    const cleanAmount = Number(amount);
    if (!cleanAmount || cleanAmount <= 0) {
    setError("Please enter a valid amount");
    return;
  }

  if (type === "income" && !note.trim()) {
    setErrornote("Please enter a note for income");
    return;
  }

  setError(""); // clear error if valid
  setErrornote("");

    if(type === "income"  ){ addTransaction({
      id: Date.now().toString(),
      type,
      amount: cleanAmount,
      note,
      date: new Date().toISOString(),
    });}else {

    addTransaction({
      id: Date.now().toString(),
      type,
      amount: cleanAmount,
      category,
      note,
      date: new Date().toISOString(),
    });}

    setAmount("");
    setNote("");
  }

  const placeholderColor = theme === "dark" ? "#9CA3AF" : "#6B7280";

  return (
    <View className="border border-gray-500 dark:border-gray-700 bg-white dark:bg-black rounded-xl p-3 mb-2">
      <TextInput
        placeholder="Amount"
        placeholderTextColor={placeholderColor}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 mb-3 text-black dark:text-white"
      />

        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false} persistentScrollbar={false}>
            <View className="flex-row flex-wrap gap-2 mb-3">
              {/*.map is an array method that loops over each item in the array. It returns a new array. c represents one item from the CATEGORIES array. */} 
              {CATEGORIES.map((c) => (
                <Pressable
                  key={c}
                  onPress={() => setCategory(c)}
                  className={`px-3 py-2 rounded-full border ${
                    category === c
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-400 dark:border-gray-600"
                  }`}
                >
                  <Text
                    className={
                      category === c
                        ? "text-white font-semibold"
                        : "text-black dark:text-white"
                    }
                  >
                    {c}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

      <TextInput
            placeholder={type === "income" ? `${errornote}` : "Note (optional)"}
            placeholderTextColor={type === "income" && errornote ? "#e57373" : placeholderColor}
            value={note}
            onChangeText={(text) => {
              <View className="flex-row flex-wrap gap-2 mb-3">
         {/*It removes any character from "TextInput" that is NOT a letter, number, space, or basic punctuation.. */} 
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCategory(c)}
            className={`px-3 py-2 rounded-full border ${
              category === c
                ? "bg-blue-500 border-blue-500"
                : "border-gray-400 dark:border-gray-600"
            }`}
          >
            <Text
              className={
                category === c
                  ? "text-white font-semibold"
                  : "text-black dark:text-white"
              }
            >
              {c}
            </Text>
          </Pressable>
        ))}
      </View>
            const cleaned = text.replace(/[^a-zA-Z0-9 .,!?'-]/g, "");
            setNote(cleaned);
              }}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 mb-3 text-black dark:text-white"
          />

      <View className="flex-row gap-3 mb-3">
        <Pressable
          onPress={() => setType("income")}
          className={`flex-1 p-3 rounded-lg ${
            type === "income" ? "bg-green-600" : "border border-gray-400"
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              type === "income" ? "text-white" : "text-black dark:text-white"
            }`}
          >
            Income
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setType("expense")}
          className={`flex-1 p-3 rounded-lg ${
            type === "expense" ? "bg-red-600" : "border border-gray-400"
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              type === "expense" ? "text-white" : "text-black dark:text-white"
            }`}
          >
            Expense
          </Text>
        </Pressable>
      </View>

            <View className="flex-row gap-3 mb-3">
              <Pressable onPress={submitHandler} className="  flex-1 p-3  bg-blue-600 rounded-lg">
                <Text className="text-white font-bold text-center">
                  Add Transaction
                </Text>
              </Pressable>

              <Pressable  onPress={() => router.push("/transactions")} className=" flex-1 p-3 rounded-lg  bg-blue-600 ">
                <Text className="text-white font-bold text-center">
                  Delete Transaction
                </Text>
              </Pressable>
              </View>
    </View>
  );
}
