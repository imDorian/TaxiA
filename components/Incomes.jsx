import { View, Text, FlatList, Linking } from "react-native";
import useRevenueStore from "../stores/revenueStore";
import { useEffect } from "react";

export default function Incomes() {
    const { income, getIncomes } = useRevenueStore()

    useEffect(() => {
        getIncomes()
    }, [])

    return (
        <View className="flex-col gap-2">
            {income?.map((income) => {
                const fuel = income.fuel.amount
                const date = new Date(income.date)
                const formattedDate = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
                const total = Number(income.earnings?.amount) - Number(income.mistakes?.amount)
                console.log(fuel, "fuel");
                return (

                    <View key={income._id} className="flex-row justify-between bg-[#1c1c1f] p-4 rounded-xl">
                        <Text className="text-white text-lg font-bold">{formattedDate}</Text>
                        <View className="flex-col gap-2 items-end">
                            <Text className="text-white text-lg font-bold">{total}€</Text>
                            <Text className="text-red-400 text-sm font-base">-{fuel}€</Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}   
