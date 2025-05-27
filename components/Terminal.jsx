import React, { useCallback, memo } from "react";
import { FlatList, View, Text } from "react-native";

const FlightItem = memo(({ item }) => {
  const {
    airline,
    terminal,
    scheduledTime,
    delay,
    flight,
    status,
    departure,
    estimatedTime,
  } = item;

  const statusColor =
    status === "landed"
      ? "bg-red-500"
      : status === "scheduled"
        ? "bg-amber-500"
        : status === "active"
          ? "bg-green-500"
          : "";

  const formattedTime = new Date(scheduledTime).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    // year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEstimated = estimatedTime
    ? new Date(estimatedTime).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        // year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <View className="flex flex-col bg-neutral-900 rounded-xl p-3 max-w-full min-w-full gap-y-2">
      <View className="flex w-full items-center flex-row justify-between">
        <Text className="text-white text-wrap text-sm">
          {departure} - {flight}
        </Text>
        <View className="flex flex-row items-center gap-x-2">
          <Text className="text-white text-wrap text-sm">
            {status === "scheduled"
              ? "Programado"
              : status === "active"
                ? "En vuelo"
                : status === "landed"
                  ? "En tierra"
                  : "No hay info"}
          </Text>
          <View className={`w-1 h-1 rounded-full flex  ${statusColor}`} />
        </View>
      </View>
      <View className="flex flex-row min-w-full max-w-full p-3 bg-[#1a1a1a] rounded-2xl shadow-2xl shadow-black">
        <View className="flex flex-row justify-start items-start w-full gap-x-2">
          <Text
            className={
              estimatedTime
                ? "text-neutral-500 font-semibold text-wrap text-base line-through "
                : "text-white font-semibold text-wrap text-base"
            }
          >
            {formattedTime}
          </Text>
          {estimatedTime ? (
            <Text className="text-white font-semibold text-wrap text-base">
              {formattedEstimated}
            </Text>
          ) : (
            ""
          )}
        </View>
      </View>
      {delay && (
        <Text className="text-white text-sm text-start">
          {`${delay} min de retraso`}
        </Text>
      )}
    </View>
  );
});

FlightItem.displayName = "FlightItem";

export default function Terminal({ terminal }) {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const filteredArrivals = terminal.filter((arrival) => {
    const arrivalTime = new Date(arrival.scheduledTime);
    return arrivalTime >= oneHourAgo;
  });

  const renderItem = useCallback(({ item }) => {
    return <FlightItem item={item} />;
  }, []);

  return (
    <FlatList
      data={filteredArrivals}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
}
