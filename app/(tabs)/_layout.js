import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                backgroundColor: "#0f0f11",
                height: 80,
            },


            tabBarShowLabel: true,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#fff",
            tabBarIcon: ({ focused, color, size }) => {
                return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
            },
            tabBarLabelStyle: {
                fontSize: 12,

            },


        }} >

            <Tabs.Screen name="index" options={{ title: "Inicio" }} />
            <Tabs.Screen name="income" options={{ title: "Ganancias" }} />
            <Tabs.Screen name="chat" options={{ title: "Chat" }} />
            <Tabs.Screen name="settings" options={{ title: "Ajustes" }} />
        </Tabs>
    )
}   
