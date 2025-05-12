import { View, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import "../global.css"

export default function Layout() {
    const isDark = useColorScheme() === "dark";

    return (
        <View className="flex-1 bg-[#0f0f11]">
            < Stack screenOptions={{ headerShown: false }
            } />
        </View >
    )
}
