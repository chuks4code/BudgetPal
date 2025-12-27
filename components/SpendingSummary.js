import { View, Text, ScrollView } from "react-native";

export default function SpendingSummary({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const totals = {};
  expenses.forEach((t) => {
    totals[t.category] = (totals[t.category] || 0) + (Number(t.amount) || 0);
  });

  const rows = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const max = rows.length ? rows[0][1] : 0;

  if (!rows.length) {
    return (
      <View className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded-xl p-4 mb-4">
        <Text className="font-semibold mb-1 text-black dark:text-white">
          Spending Summary
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
          No expenses to summarize.
        </Text>
      </View>
    );
  }

  const CHART_HEIGHT = 60;

  return (
    <View className="border border-gray-500 dark:border-gray-700 bg-white dark:bg-black rounded-xl p-3 mb-2">
      <Text className="font-semibold mb-2 text-black dark:text-white">
        Spending Summary
      </Text>

      {/* 
        Vertical bar chart
        - Scrolls horizontally so it doesn't push AddTransaction down
        - Height is fixed for clean layout
      */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 3 }}
      >
        <View className="flex-row items-end gap-2">
          {rows.map(([categoryy, amt]) => {
            const ratio = max ? amt / max : 0;
            const barHeight = Math.max(6, Math.round(ratio * CHART_HEIGHT));

            return (
              <View
                key={categoryy}
                className="items-center"
                style={{ width: 60 }}
              >
                {/* Amount */}
                <Text className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                  ${amt}
                </Text>

                {/* Bar container */}
                <View
                  className="w-10 bg-gray-200 dark:bg-gray-800 rounded-t-lg overflow-hidden flex justify-end"
                  style={{ height: CHART_HEIGHT }}
                >
                  {/* Actual bar */}
                  <View
                    className="w-10 bg-black dark:bg-white rounded-t-lg"
                    style={{ height: barHeight }}
                  />
                </View>

                {/* Category label */}
                <Text
                        /*The text will never wrap to a second line, eg and make it fit width Transp...*/
                  numberOfLines={1}
                  className="text-xs text-black dark:text-white mt-2"
                  style={{ width: 70, textAlign: "center" }}
                >
                  {categoryy}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}







// import { View, Text, ScrollView } from "react-native";

// export default function SpendingSummary({ transactions }) {
//   const expenses = transactions.filter((t) => t.type === "expense");

//   const totals = {};
//   expenses.forEach((t) => {
//     totals[t.category] = (totals[t.category] || 0) + (Number(t.amount) || 0);
//   });

//   const rows = Object.entries(totals).sort((a, b) => b[1] - a[1]);
//   const max = rows.length ? rows[0][1] : 0;

//   if (!rows.length) {
//     return (
//       <View className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded-xl p-4 mb-4">
//         <Text className="font-semibold mb-1 text-black dark:text-white">
//           Spending Summary
//         </Text>
//         <Text className="text-gray-500 dark:text-gray-400">
//           No expenses to summarize.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View className="border border-gray-500 dark:border-gray-700 bg-white dark:bg-black rounded-xl p-3 mb-2">
//       <Text className="font-semibold mb-3 text-black dark:text-white">
//         Spending Summary
//       </Text>

//       {/*  Scroll area (so it doesn't push AddTransaction down) */}
//       <ScrollView
//           /*Sets a maximum height of 140 pixels for the scrollable area.*/
//         style={{ maxHeight: 140 }}
//         /*Setting this to "false" hides the vertical scroll indicator*/
//         showsVerticalScrollIndicator={true}
//       >
//         {rows.map(([categoryy, amt]) => {
//           const pct = max ? Math.round((amt / max) * 100) : 0;

//           return (
//             <View key={categoryy} className="mb-3">
//               <View className="flex-row justify-between mb-1">
//                 <Text className="font-medium text-black dark:text-white">
//                   {categoryy}
//                 </Text>
//                 <Text className="text-gray-700 dark:text-gray-300">
//                   ${amt}
//                 </Text>
//               </View>

//               {/*  The 'overflow-hidden' ensures that the inner colored bar never exceeds the rounded container. */}
//               <View className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
//                 <View
//                   className="h-3 bg-black dark:bg-white"
//                   style={{ width: `${pct}%` }}
//                 />
//               </View>
//             </View>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// }
