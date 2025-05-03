import { Text, ScrollView, View, } from "react-native";
import Screen from "../components/Screen";
import { StatusBar } from "expo-status-bar";
import Revenue from "../components/Revenue";
import Errors from "../components/Errors";
import Apps from "../components/Apps";
import Fuel from "../components/Fuel";
export default function Index() {
    return (
        <Screen>
            <StatusBar hidden />
            <Text className="text-white text-2xl font-bold">Facturación</Text>
            <ScrollView className=" flex-1">
                <View className="flex-col gap-5 pb-20">
                    <Revenue />
                    <Errors />
                    <Apps />
                    <Fuel />
                </View>
            </ScrollView>
        </Screen >
    )
}


