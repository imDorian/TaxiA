import { Text, ScrollView, View, Pressable } from "react-native";
import Screen from "../../components/Screen";
import Revenue from "../../components/Revenue";
import Errors from "../../components/Errors";
import Apps from "../../components/Apps";
import Fuel from "../../components/Fuel";
import "../../global.css";
import useRevenueStore from "../../stores/revenueStore";
import Date from "../../components/Date";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { tokenValidation } from "../../functions/tokenValidation";
import { getUser } from "../../functions/getUser";
export default function Index() {
  const { createBilling, loadingBilling } = useRevenueStore();
  const router = useRouter();
  async function user() {
    const token = await AsyncStorage.getItem("token");
    const user = await getUser(token);
    if (user.error) {
      router.replace("login/login");
    }
    useRevenueStore.setState((prev) => ({
      ...prev,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      number: user.number,
      user: user._id,
    }));
  }
  useEffect(() => {
    user();
  }, []);
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View className="flex-col gap-5 pb-40">
          <Date />
          <Text className="text-white text-3xl font-bold py-2.5">
            Facturación
          </Text>
          <Revenue />
          <Errors />
          <Apps />
          <Fuel />
          <Pressable
            disabled={loadingBilling}
            onPress={() => createBilling()}
            className="bg-green-800 p-3 rounded-xl disabled:opacity-50"
          >
            <Text className="text-white text-xl text-center font-semibold">
              {loadingBilling ? "Creando Factura..." : "Crear Factura"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
