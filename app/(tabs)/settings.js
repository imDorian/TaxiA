import { Pressable, Text, View } from "react-native";
import Screen from "../../components/Screen";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  function logout() {
    router.replace("/login");
  }
  return (
    <Screen className="">
      <View>
        <Text className="text-white text-3xl font-bold">Setting</Text>
      </View>
      <Pressable onPress={logout} className="bg-red-400 rounded-2xl p-4">
        <Text className="text-white text-center">Cerrar Sesion</Text>
      </Pressable>
    </Screen>
  );
}
