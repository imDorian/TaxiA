import { View, Text, TextInput } from "react-native";
import Card from "./Card";
import useRevenueStore from "../stores/revenueStore";

export default function Errors() {
    const { error, handleChange } = useRevenueStore();
    return (
        <Card>
            <Text className="text-white text-lg font-semibold">Errores de facturación</Text>
            <View className="w-full bg-red-400/40 rounded-2xl p-3">
                <Text className="text-red-300 text-base font-semibold">{error.amount && error.errors ? `${error.errors} errores han sumado ${error.amount}€` : "No hay errores"}</Text>
            </View>
            <View className="flex-row gap-3">
                <View className="flex-1 w-1/2">
                    <Text className="text-neutral-400 text-base font-semibold">Viajes Erroneos</Text>
                    <TextInput
                        className="w-full bg-transparent border-[0.5px] border-neutral-700 rounded-2xl p-3 text-white font-medium text-lg text-center"
                        placeholder="2"
                        placeholderTextColor="#808080"
                        value={error.errors}
                        onChangeText={value => handleChange('error', 'errors', value)}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                </View>
                <View className="flex-1 w-1/2">
                    <Text className="text-neutral-400 text-base font-semibold">Monto incorrecto</Text>
                    <TextInput
                        className="w-full bg-transparent border-[0.5px] border-neutral-700 rounded-2xl p-3 text-white font-medium text-lg"
                        placeholder="€ 9,39"
                        placeholderTextColor="#808080"
                        value={error.amount}
                        onChangeText={value => handleChange('error', 'amount', value)}
                        keyboardType="numeric"
                        inputMode="numeric"
                    />
                </View>
            </View>
        </Card>
    )
}       
