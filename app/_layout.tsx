import "../global.css";
import { Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
           <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen  name="index" options={{tabBarLabel: "Home", tabBarIcon:({ color, size })  => <MaterialIcons name="home" color={color} size={size} />,  }}/>

            <Tabs.Screen  name="transactions" options={{tabBarLabel: "Transaction" , tabBarIcon:({ color, size })  => <MaterialIcons name="attach-money" color={color} size={size} />, }}  />
           </Tabs>
    </GestureHandlerRootView>
  );
}
