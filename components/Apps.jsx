import { View, Text, ScrollView, TextInput } from "react-native";
import Card from "./Card";
import CardApp from "./CardApp";
export default function Apps() {
    return (
        <Card>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate="normal"
            >
                <View className="flex-row gap-2">
                    <CardApp name="Uber" />
                    <CardApp name="Bolt" />
                    <CardApp name="Cabify" />
                </View>
            </ScrollView>
        </Card>
    )
}       
