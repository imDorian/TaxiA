import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0f0f11",
          height: 80,
        },
        statusBarStyle: "light",

        tabBarShowLabel: true,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen
        name="income"
        options={{ title: "Ganancias", headerShown: false }}
      />
      <Tabs.Screen
        name="chat"
        options={{ title: "Chat", headerShown: false }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Ajustes", headerShown: false }}
      />
    </Tabs>
  );
}
