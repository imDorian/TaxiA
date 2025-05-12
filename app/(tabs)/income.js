import { Text, ScrollView, View, Pressable } from "react-native";
import Screen from "../../components/Screen";
import Chart from "../../components/Chart";
import Incomes from "../../components/Incomes";
import { useState } from "react";
export default function Income() {

    const [selected, setSelected] = useState('incomes')

    const handleSelected = (selected) => {
        setSelected(selected)
    }

    return (
        <Screen>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            // style={{ flex: 1 }}
            >
                <View className="flex-col gap-5 pb-40">
                    <Text className="text-white text-3xl font-bold py-2.5">Ganancias</Text>
                    <Chart />
                    <View className="flex-row justify-around">
                        <Pressable className={selected === 'incomes' ? "flex-row gap-2" : "flex-row gap-2 opacity-50"} onPress={() => handleSelected('incomes')}>
                            {({ pressed }) => (
                                <Text className={`text-white text-xl font-bold ${pressed ? 'opacity-50' : 'opacity-100'}`}>Ganancias</Text>
                            )}


                        </Pressable>
                        <Pressable className={selected === 'fuel' ? "flex-row gap-2" : "flex-row gap-2 opacity-50"} onPress={() => handleSelected('fuel')}>
                            {({ pressed }) => (
                                <Text className={`text-white text-xl font-bold ${pressed ? 'opacity-50' : 'opacity-100'}`}>Combustible</Text>
                            )}
                        </Pressable>
                    </View>
                    <Incomes />
                </View>
            </ScrollView>
        </Screen>
    )
}   
