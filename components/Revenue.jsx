import { View, Text, TextInput, Pressable } from "react-native";
import Card from "./Card";
import { useEffect, useState } from "react";
import useRevenueStore from "../stores/revenueStore";
export default function Revenue() {
  const { earnings, handleChange, autoCalculate, handleAutoCalculate } =
    useRevenueStore();

  const autoCalculated = () => {
    if (autoCalculate) {
      if (earnings.amount !== "") {
        const cash = (Number(earnings.amount) - Number(earnings.card)).toFixed(
          2,
        );
        useRevenueStore.setState((prev) => ({
          ...prev,
          earnings: { ...prev.earnings, cash: String(cash), tips: "" },
        }));
      } else {
        useRevenueStore.setState((prev) => ({
          ...prev,
          earnings: { ...prev.earnings, cash: "", tips: "" },
        }));
      }
    } else {
      useRevenueStore.setState((prev) => ({
        ...prev,
        earnings: { ...prev.earnings, cash: "", tips: "" },
      }));
      const total = Number(earnings.cash) + Number(earnings.card);
      if (total > Number(earnings.amount)) {
        const tips = (total - Number(earnings.amount)).toFixed(2);
        useRevenueStore.setState((prev) => ({
          ...prev,
          earnings: { ...prev.earnings, tips: String(tips) },
        }));
      } else if (total < Number(earnings.amount)) {
        const tips = (total - Number(earnings.amount)).toFixed(2);

        useRevenueStore.setState((prev) => ({
          ...prev,
          earnings: { ...prev.earnings, tips: String(tips) },
        }));
      } else if (total === Number(earnings.amount)) {
        useRevenueStore.setState((prev) => ({
          ...prev,
          earnings: { ...prev.earnings, tips: "" },
        }));
      }
    }
  };

  useEffect(() => {
    autoCalculated();
  }, [earnings.amount, earnings.card, earnings.cash, autoCalculate]);

  return (
    <Card>
      <Text className="text-white text-lg font-bold">Facturación de hoy</Text>
      <View className="flex-col gap-1 w-full">
        <Text className="text-neutral-400 text-base font-semibold">
          Contador taxi
        </Text>
        <TextInput
          className="text-green-300 text-2xl font-bold rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-2 w-full"
          placeholder={"€ 209,39"}
          placeholderTextColor="gray"
          keyboardType="numeric"
          inputMode="numeric"
          value={earnings.amount}
          onChangeText={(value) => handleChange("earnings", "amount", value)}
        />
      </View>
      <View className="flex-col gap-2 w-full">
        <Text className="text-neutral-400 text-base font-semibold">
          Pagos en tarjeta
        </Text>
        <TextInput
          className="text-green-300 text-2xl font-bold rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-2 w-full"
          placeholder="€ 209,39"
          placeholderTextColor="gray"
          value={earnings.card}
          onChangeText={(value) => handleChange("earnings", "card", value)}
          keyboardType="numeric"
          inputMode="numeric"
        />
      </View>
      <View className="flex-row w-full justify-between items-center px-5 py-3 rounded-2xl bg-neutral-800 mt-2">
        <View className="flex-col w-1/2 items-start pe-4 gap-y-1">
          <Text className="text-neutral-400 text-base font-semibold">
            Pagos en efectivo
          </Text>
          <TextInput
            editable={!autoCalculate}
            className={
              autoCalculate
                ? "text-white text-2xl font-bold rounded-2xl  bg-transparent p-2 border-[0.5px] border-transparent w-full"
                : "text-white text-2xl font-bold rounded-2xl p-2 bg-[#1a1a1c] border-[0.5px] border-neutral-700 w-full"
            }
            placeholder="€ 209,39"
            placeholderTextColor="gray"
            value={earnings.cash}
            onChangeText={(value) => handleChange("earnings", "cash", value)}
            keyboardType="numeric"
            inputMode="numeric"
          />
        </View>
        <View className="flex-col w-1/2 items-center gap-y-2">
          <Text
            className={
              earnings.tips > 0
                ? "text-green-300 opacity-95"
                : "text-red-300 opacity-95"
            }
          >
            {earnings.tips > 0
              ? `${earnings.tips}€ de propina`
              : earnings.tips < 0
                ? `${earnings.tips}€ faltan`
                : ""}
          </Text>
          <Pressable
            onPress={() => handleAutoCalculate()}
            className={
              autoCalculate
                ? "bg-green-500/20 p-2 rounded-2xl shadow-lg active:bg-green-500/30"
                : "bg-red-500/20 p-2 rounded-2xl shadow-lg active:bg-red-500/30"
            }
          >
            <Text
              className={
                autoCalculate
                  ? "text-green-400 text-base text-center "
                  : "text-red-400 text-base text-center "
              }
            >
              Auto-calcular
            </Text>
          </Pressable>
        </View>
      </View>
    </Card>
  );
}
