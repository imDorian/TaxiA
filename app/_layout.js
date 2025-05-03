import { View } from "react-native";
import { Stack } from "expo-router";
import "../global.css"

export default function Layout() {


    return (
        <View className="flex-1">
            <Stack screenOptions={{ headerShown: false }} />
        </View>
    )
}
