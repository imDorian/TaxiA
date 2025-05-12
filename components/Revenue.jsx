import { View, Text, TextInput, Pressable } from "react-native";
import Card from "./Card";
import { useEffect, useState } from "react";
import useRevenueStore from "../stores/revenueStore";
export default function Revenue() {

    const { earnings, handleChange, autoCalculate, handleAutoCalculate } = useRevenueStore();





    const autoCalculated = () => {
        if (autoCalculate) {
            if (earnings.amount !== "" && earnings.card !== "") {
                const cash = (Number(earnings.amount) - Number(earnings.card)).toFixed(2);
                useRevenueStore.setState(prev => ({ ...prev, earnings: { ...prev.earnings, cash: String(cash) } }));
            }
        }
        return;
    }

    useEffect(() => {
        autoCalculated();
    }, [earnings.amount, earnings.card]);

    return (
        <Card>
            <Text className="text-white text-lg font-bold">Facturación de hoy</Text>
            <View className="flex-col gap-1 w-full">
                <Text className="text-neutral-400 text-base font-semibold">Facturación total</Text>
                <TextInput
                    className="text-green-300 text-2xl font-bold rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-2 w-full"
                    placeholder={"€ 209,39"}
                    placeholderTextColor="#6ee7b7"
                    keyboardType="numeric"
                    inputMode="numeric"
                    value={earnings.amount}
                    onChangeText={value => handleChange('earnings', 'amount', value)}
                />
            </View>
            <View className="flex-col gap-2 w-full">
                <Text className="text-neutral-400 text-base font-semibold">Pagos en tarjeta</Text>
                <TextInput
                    className="text-green-300 text-2xl font-bold rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-2 w-full"
                    placeholder="€ 209,39"
                    placeholderTextColor="#808080"
                    value={earnings.card}
                    onChangeText={value => handleChange('earnings', 'card', value)}
                    keyboardType="numeric"
                    inputMode="numeric"
                />
            </View>
            <View className="flex-row w-full justify-between items-center px-5 py-3 rounded-2xl bg-neutral-800 mt-2">
                <View className="flex-col w-1/2">
                    <Text className="text-neutral-400 text-base font-semibold">Pagos en efectivo</Text>
                    <TextInput
                        className="text-white text-2xl font-bold rounded-2xl  bg-transparent p-2"
                        placeholder="€ 209,39"
                        placeholderTextColor="white"
                        value={earnings.cash}
                        onChangeText={value => handleChange('earnings', 'cash', value)}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                </View>
                <View className="flex-col w-1/2">
                    <Pressable onPress={() => handleAutoCalculate()} className={autoCalculate ? "bg-green-500/20 p-2 rounded-2xl shadow-lg active:bg-green-500/30" : "bg-red-500/20 p-2 rounded-2xl shadow-lg active:bg-red-500/30"}>
                        <Text className={autoCalculate ? "text-green-400 text-base text-center " : "text-red-400 text-base text-center "}>Auto-calcular</Text>
                    </Pressable>
                </View>
            </View>
        </Card >
    )
}

