import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useRevenueStore from "../stores/revenueStore";

export default function CustomDatePicker() {
  const { date } = useRevenueStore();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate)
      useRevenueStore.setState((prev) => ({ ...prev, date: selectedDate }));
  };

  return (
    <View className="mt-5">
      <Text style={{ marginBottom: 10, color: "#ccc" }}>
        Selecciona una fecha
      </Text>

      <Pressable
        className="bg-[#1b1b1d] p-3 min-w-full rounded-2xl border border-[#333]"
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          textColor="white"
          locale="es"
        />
      )}
    </View>
  );
}
