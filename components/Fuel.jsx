import { View, Text, Pressable, TextInput } from "react-native";
import Card from "./Card";

export default function Fuel() {
    return (
        <Card>
            <Text className='text-white text-lg font-semibold'>Combustible</Text>
            <View className="flex-row justify-between w-full items-center">
                <Pressable className="text-center p-2 rounded-xl bg-neutral-800">
                    <Text className='text-white'>Gasolina</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white'>Diesel</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white'>Gas</Text>
                </Pressable>
                <Pressable>
                    <Text className='text-white'>Electric</Text>
                </Pressable>
            </View>
            <View className="flex-row w-full items-center justify-between">
                <View className="flex-col gap-1 w-1/2">
                    <Text className='text-neutral-400 font-semibold'>
                        Combustible de hoy
                    </Text>
                    <TextInput
                        className="w-full bg-transparent border-[0.5px] border-neutral-700 rounded-2xl p-3 text-white font-medium text-lg text-center"
                        placeholder="2"
                        placeholderTextColor="#808080"
                    />
                </View>
                <View className="flex-col gap-1 w-1/2 items-end">
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