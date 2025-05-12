import { View, Text, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import { useLocalSearchParams } from "expo-router";
import { getDetail } from "../../functions/getDetail";
import { useEffect, useState } from "react";
export default function IncomeDetail() {
    const { id } = useLocalSearchParams();
    const [detail, setDetail] = useState(null);
    const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    useEffect(() => {
        getDetail(id).then((data) => {
            setDetail(data);
        })
    }, [])

    return (
        <Screen>
            <ScrollView className="">
                <View className="flex-col items-center justify-center gap-5">
                    <Text className="text-white text-2xl font-semibold text-center">{days[new Date(detail?.date).getDay()]}, {new Date(detail?.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</Text>
                    <View className="flex-col items-center justify-center">
                        <Text className="text-white text-3xl font-semibold">Total facturado</Text>
                        <Text className="text-white text-3xl font-normal">{detail?.earnings?.amount} €</Text>
                    </View>
                    <View className="flex-col items-start justify-center p-5 gap-2">
                        <Text className="text-white text-2xl font-semibold">Facturación</Text>
                        <View>
                            <View className="flex-row items-center justify-between w-full">
                                <Text className="text-white text-xl font-normal">Tarjeta</Text>
                                <Text className="text-white text-xl font-normal">{detail?.earnings?.card} €</Text>
                            </View>
                            <View className="flex-row items-center justify-between w-full">
                                <Text className="text-white text-xl font-normal">Efectivo</Text>
                                <Text className="text-white text-xl font-normal">{detail?.earnings?.cash} €</Text>
                            </View>
                            <View className="flex-row items-center justify-between w-full">
                                <Text className="text-white text-xl font-normal">Errores</Text>
                                <Text className="text-red-300 text-xl font-normal">-{detail?.mistakes?.amount ?? ""} €</Text>
                            </View>
                            <View className="flex-row items-center justify-between w-full">
                                <Text className="text-white text-xl font-normal">Combustible</Text>
                                <Text className="text-red-300 text-xl font-normal">-{detail?.fuel?.amount ?? ""} €</Text>
                            </View>
                        </View>
                        <Text className="text-white text-2xl font-semibold">Apps</Text>
                    </View>
                </View>
            </ScrollView>

        </Screen>

    )
}
