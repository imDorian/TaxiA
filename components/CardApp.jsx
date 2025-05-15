import { View, Text, TextInput } from "react-native";
import Card from "./Card";

export default function CardApp({ name }) {
  return (
    <Card>
      <Text className="text-white text-lg font-semibold">{name}</Text>
      <View className="max-w-56 flex-row gap-2">
        <View className="flex-col gap-2 w-1/2">
          <View className="flex-col gap-1">
            <Text className="text-neutral-400 text-sm font-semibold">
              Total (€)
            </Text>
            <TextInput
              className="text-white text-lg font-semibold bg-[#0f0f11]  rounded-2xl p-2 w-full"
              placeholder="120.50"
              placeholderTextColor="#808080"
            />
          </View>
          <View className="flex-col gap-1">
            <Text className="text-neutral-400 text-sm font-semibold">
              Propinas (€)
            </Text>
            <TextInput
              className="text-white text-lg font-semibold bg-[#0f0f11]  rounded-2xl p-2 w-full"
              placeholder="8"
              placeholderTextColor="#808080"
            />
          </View>
        </View>
        <View className="flex-col gap-2 w-1/2 ">
          <View className="flex-col gap-1">
            <Text className="text-neutral-400 text-sm font-semibold">
              Efectivo (€)
            </Text>
            <TextInput
              className="text-white text-lg font-semibold bg-[#0f0f11]  rounded-2xl p-2 w-full"
              placeholder="120.50"
              placeholderTextColor="#808080"
            />
          </View>
          <View className="flex-col gap-1">
            <Text className="text-neutral-400 text-sm font-semibold">
              Promos (€)
            </Text>
            <TextInput
              className="text-white text-lg font-semibold bg-[#0f0f11]  rounded-2xl p-2 w-full"
              placeholder="120.50"
              placeholderTextColor="#808080"
            />
          </View>
        </View>
      </View>
    </Card>
  );
}
