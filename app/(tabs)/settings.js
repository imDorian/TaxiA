import { Pressable, Text, View } from "react-native";
import Screen from "../../components/Screen";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useRevenueStore from "../../stores/revenueStore";

export default function Settings() {
  const { name, lastName, email, number } = useRevenueStore();
  const router = useRouter();

  async function logout() {
    await AsyncStorage.removeItem("token");
    router.replace("login/login");
  }
  return (
    <Screen className="">
      <View>
        <Text className="text-white text-3xl font-bold">Setting</Text>
        <View>
          <Text className="text-white">{name}</Text>
          <Text className="text-white">{lastName}</Text>
          <Text className="text-white">{email}</Text>
          <Text className="text-white">{number}</Text>
        </View>
      </View>
      <Pressable onPress={logout} className="bg-red-400 rounded-2xl p-4">
        <Text className="text-white text-center">Cerrar Sesion</Text>
      </Pressable>
    </Screen>
  );
}
