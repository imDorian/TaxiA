import { Text, ScrollView, View, Pressable } from "react-native";
import Screen from "../../components/Screen";
import Revenue from "../../components/Revenue";
import Errors from "../../components/Errors";
import Apps from "../../components/Apps";
import Fuel from "../../components/Fuel";
import '../../global.css'
import useRevenueStore from "../../stores/revenueStore";
export default function Index() {
    const { createBilling, loadingBilling } = useRevenueStore();
    return (
        <Screen className="p-0">
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                <View className="flex-col gap-5 pb-40">
                    <Text className="text-white text-3xl font-bold py-2.5">Facturación</Text>
                    <Revenue />
                    <Errors />
                    <Apps />
                    <Fuel />
                    <Pressable disabled={loadingBilling} onPress={() => createBilling()} className="bg-amber-600 p-3 rounded-xl disabled:opacity-50">
                        <Text className="text-white text-xl text-center font-semibold">{loadingBilling ? "Creando Factura..." : "Crear Factura"}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </Screen >
    )
}

