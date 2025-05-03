import { Text, ScrollView, View, } from "react-native";
import Screen from "../../components/Screen";
import Revenue from "../../components/Revenue";
import Errors from "../../components/Errors";
import Apps from "../../components/Apps";
import Fuel from "../../components/Fuel";
import '../../global.css'
import { Tabs } from "expo-router";
export default function Index() {
    return (
        <Screen>
            <ScrollView className=" flex-1">
                <View className="flex-col gap-5 pb-20">
                    <Text className="text-white text-3xl font-bold py-2.5">Facturación</Text>
                    <Revenue />
                    <Errors />
                    <Apps />
                    <Fuel />
                </View>
            </ScrollView>
        </Screen >
    )
}


