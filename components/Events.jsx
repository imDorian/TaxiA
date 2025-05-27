import { FlatList, View, Text, Pressable, Linking } from "react-native";

export default function Events({ events }) {
  const openGoogleMaps = (direction) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direction)}`;
    Linking.openURL(url);
  };

  const openWaze = (direction) => {
    const url = `https://waze.com/ul?q=${encodeURIComponent(direction)}&navigate=yes`;
    Linking.openURL(url);
  };
  return (
    <FlatList
      data={events?.sort(
        (a, b) => new Date(a.date.localDate) - new Date(b.date.localDate),
      )}
      renderItem={({ item }) => {
        const {
          name,
          image,
          venue,
          street,
          city,
          country,
          date,
          url,
          distance,
          id,
        } = item;
        return (
          <View className="flex flex-col bg-neutral-900 rounded-xl p-3 max-w-full min-w-full gap-y-2">
            <Text className="text-white font-semibold">
              {venue} a {distance} km
            </Text>
            <View className="flex flex-col min-w-full max-w-full p-3 bg-[#1a1a1a] rounded-2xl shadow-2xl shadow-black">
              <View className="flex flex-col justify-start items-start">
                <Text className="text-white font-semibold text-nowrap text-base">
                  {new Date(date?.localDate).toLocaleDateString("es-Es", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  ,{` `}
                  {date.localTime?.slice(0, -3) || "sin hora"}
                </Text>
                <Text className="text-white text-wrap text-sm">{name}</Text>
              </View>
              <View className="flex flex-row justify-start items-start gap-x-2">
                <Text className="text-white text-sm text-nowrap">
                  {street}, {city}, {country}
                </Text>
              </View>
            </View>
            <View className="min-w-full max-w-full flex flex-row justify-around items-center mt-1">
              <Pressable
                onPress={() => openGoogleMaps(street, city, country)}
                className="py-2 px-16 bg-neutral-300 rounded-lg"
              >
                <Text className="font-medium text-blue-500 text-center">
                  Maps
                </Text>
              </Pressable>
              <Pressable
                onPress={() => openWaze(street, city, country)}
                className="py-2 px-16 bg-blue-500 rounded-lg"
              >
                <Text className="font-medium text-neutral-300 text-center">
                  Waze
                </Text>
              </Pressable>
            </View>
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
