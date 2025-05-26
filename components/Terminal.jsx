import { FlatList, View, Text } from "react-native";

export default function Terminal({ terminal }) {
  return (
    <FlatList
      data={terminal}
      renderItem={({ item }) => {
        const { airline, terminal, scheduledTime, delay, flight, status } =
          item;
        return (
          <View className="flex flex-col bg-neutral-900 rounded-xl p-3 max-w-full min-w-full gap-y-2">
            <View className="flex w-full items-end">
              <View
                className={
                  status === "landed"
                    ? "w-1 h-1 rounded-full bg-red-500"
                    : status === "scheduled"
                      ? "w-1 h-1 rounded-full bg-amber-500"
                      : status === "active"
                        ? "w-1 h-1 rounded-full bg-green-500"
                        : ""
                }
              />
            </View>
            <View className="flex flex-row min-w-full max-w-full p-3 bg-[#1a1a1a] rounded-2xl shadow-2xl shadow-black">
              <View className="flex flex-col justify-start items-start w-1/2">
                <Text className="text-white font-semibold text-wrap text-base">
                  {new Date(scheduledTime).toLocaleDateString("es-Es", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text className="text-white text-wrap text-sm">
                  {status === "scheduled"
                    ? "Programado"
                    : status === "active"
                      ? "Activo"
                      : status === "landed"
                        ? "Aterrizado"
                        : "No hay info"}
                </Text>
              </View>
              <View className="flex flex-col justify-start items-end  w-1/2">
                <View className="flex flex-row justify-center items-center gap-x-2">
                  <Text className="text-white text-sm">
                    {delay ? `${delay} min de retraso` : ""}
                  </Text>
                </View>
                <Text className="text-white text-wrap text-sm">{flight}</Text>
              </View>
            </View>
          </View>
        );
      }}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
