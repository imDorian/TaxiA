import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import Card from "./Card";
import useRevenueStore from "../stores/revenueStore";
export default function Fuel() {
    const fuelTypes = [
        "Gasolina",
        "Diesel",
        "Electric",
        "GLP",
        "GNC",
        "Hidrógeno"
    ]
    const { fuel, handleFuelType, handleChange } = useRevenueStore();



    return (
        <Card className="gap-y-4">
            <Text className='text-white text-lg font-semibold'>Combustible</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="normal"
                contentContainerStyle={{
                    gap: 8,
                    paddingHorizontal: 4,

                }}
                className="flex-row max-w-full">
                {fuelTypes.map((type, index) => (
                    <Pressable onPress={() => handleFuelType(type)} key={index} className={fuel.type === type ? "text-center p-2 rounded-xl bg-neutral-300" : "text-center p-2 rounded-xl bg-neutral-700"}>
                        <Text className={fuel.type === type ? 'text-black' : 'text-white'}>{type}</Text>
                    </Pressable>
                ))}

            </ScrollView>
            <View className="flex-row w-full items-center justify-between">
                <View className="flex-col gap-1 w-1/2 items-center">
                    <Text className='text-neutral-400 font-semibold'>
                        Combustible de hoy
                    </Text>
                    <TextInput
                        className="w-full bg-transparent border-[0.5px] border-neutral-700 rounded-2xl p-3 text-white font-medium text-lg text-center"
                        placeholder="€ 60.66"
                        placeholderTextColor="#808080"
                        value={fuel.amount}
                        onChangeText={value => handleChange('fuel', 'amount', value)}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                </View>
                <View className="flex-col gap-1 w-1/2 items-center">
                    <Text className='text-neutral-400 font-semibold'>
                        Mensual
                    </Text>
                    <Text className="text-white text-lg font-semibold">
                        200€
                    </Text>
                </View>
            </View>
        </Card>
    )
}