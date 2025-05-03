import { View, Text, TextInput, Pressable } from "react-native";
import Card from "./Card";

export default function Revenue() {
    return (
        <Card>
            <Text className="text-white text-lg font-bold">Ganancias de hoy</Text>
            <View className="flex-col gap-1 w-full">
                <Text className="text-neutral-400 text-base font-semibold">Ganancias totales</Text>
                <TextInput
                    className="text-green-300 text-2xl font-bold rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-2 w-full"
                    placeholder="€ 209,39"
                    placeholderTextColor="#6ee7b7"
                />
            </View>
            <View className="flex-col gap-2 w-full">
                <Text className="text-neutral-400 text-base font-semibold">Pagos en tarjeta</Text>
                <TextInput
                    className="text-green-300 text-2xl font-bold rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-2 w-full"
                    placeholder="€ 209,39"
                    placeholderTextColor="#808080"
                />
            </View>
            <View className="flex-row w-full justify-between items-center px-5 py-3 rounded-2xl bg-neutral-800 mt-2">
                <View className="flex-col">
                    <Text className="text-neutral-400 text-base font-semibold">Pagos en efectivo</Text>
                    <TextInput
                        className="text-white text-2xl font-bold rounded-2xl  bg-transparent p-2 w-full"
                        placeholder="€ 209,39"
                        placeholderTextColor="white"
                    />
                </View>
                <View>
                    <Pressable className="bg-green-500/20 p-2 rounded-2xl">
                        <Text className="text-green-400 text-base">Auto-calcular</Text>
                    </Pressable>
                </View>
            </View>
        </Card>
    )
}   
