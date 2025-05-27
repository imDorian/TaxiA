import { Text, View, Pressable, Image } from "react-native";
import Screen from "../../components/Screen";
import { useState, useEffect, useRef } from "react";
import { get } from "../../functions/bbdd";
import logo from "../../assets/logo.png";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { getGeoHash } from "../../functions/getGeoHash";
import { getChat } from "../../functions/getChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useRevenueStore from "../../stores/revenueStore";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Terminal from "../../components/Terminal";
import Events from "../../components/Events";
export default function Chat() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const scrollViewRef = useRef(null);
  const socketRef = useRef(null);
  const { chat, terminal1, terminal2, terminal4, terminalRefresh, events } =
    useRevenueStore();

  const [terminalSel, setTerminalSel] = useState("1");
  const [category, setCategory] = useState("events");
  const [location, setLocation] = useState({
    geoPoint: "",
    latitude: 0,
    longitude: 0,
  });

  async function getMyChat() {
    const token = await AsyncStorage.getItem("token");
    const geo = await getGeoHash();

    const res = await getChat(token, `geoPoint=${geo.geoPoint}`);
    if (!res) return console.log("no hay chat");
    useRevenueStore.setState((prev) => ({
      ...prev,
      terminal1: res.flights.terminal1,
      terminal2: res.flights.terminal2,
      terminal4: res.flights.terminal4,
      terminalRefresh: res.flights.date,
      events: res.events,
    }));
  }

  const getGeo = async () => {
    try {
      const geo = getGeoHash();
      geo.then(({ geoPoint, latitude, longitude }) => {
        setLocation({ geoPoint, latitude, longitude });
        getWeather(latitude, longitude);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGeo();
    getMyChat();
  }, []);

  async function receiveMessage() {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      const data = await get(
        "chat",
        "message",
        `geoPoint=${location.geoPoint}`,
        token,
      );
    } catch (error) {
      console.error(error);
      await AsyncStorage.removeItem("token");
      router.replace("/login/login");
    } finally {
      setLoading(false);
    }
  }

  async function getWeather(latitude, longitude) {
    const data = await get(
      "chat",
      "weather",
      `lat=${latitude}&lon=${longitude}`,
    );
    setWeather(data);
  }

  return (
    <Screen>
      <View className="flex flex-row justify-between min-w-full">
        <View className="flex flex-row justify-start items-center py-2">
          <Image source={logo} className="w-10 h-10" />
          <Text className="text-white font-semibold italic flex flex-row justify-center items-center text-lg ">
            TaxiA
          </Text>
        </View>
        <View className="flex flex-col justify-center items-start">
          <Text className="text-white text-base font-bold">
            {capitalizeFirstLetter(weather?.weather)}{" "}
            {weather.temperature?.toFixed(0)}º
          </Text>
          <Text className="text-white text-sm">
            {weather?.zone}, {weather?.country}
          </Text>
        </View>
      </View>
      <View className="flex-col items-center gap-3 pb-16 min-h-full max-h-full ">
        <View className="flex flex-col min-w-full">
          <View className="flex flex-row justify-around items-center  bg-neutral-900 rounded-xl p-4 shadow-2xl shadow-black min-w-full">
            <Pressable
              onPress={() => setCategory("events")}
              className={
                category === "events"
                  ? "flex flex-row justify-center items-center gap-x-2 bg-neutral-700 rounded-xl p-2"
                  : "flex flex-row justify-center items-center gap-x-2"
              }
            >
              <MaterialIcons name="event" size={24} color="white" />
              <Text className="text-white text-lg text-center">Eventos</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("flights")}
              className={
                category === "flights"
                  ? "flex flex-row justify-center items-center gap-x-2 bg-neutral-700 rounded-xl p-2"
                  : "flex flex-row justify-center items-center gap-x-2"
              }
            >
              <MaterialIcons name="flight" size={24} color="white" />
              <Text className="text-white text-lg text-center">Vuelos</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("trains")}
              className={
                category === "trains"
                  ? "flex flex-row justify-center items-center gap-x-2 bg-neutral-700 rounded-xl p-2"
                  : "flex flex-row justify-center items-center gap-x-2"
              }
            >
              <MaterialIcons name="train" size={24} color="white" />
              <Text className="text-white text-lg text-center">Trenes</Text>
            </Pressable>
          </View>
        </View>

        {category === "flights" && (
          <>
            <View className="flex flex-row justify-around w-full mt-2">
              <Pressable
                onPress={() => setTerminalSel("1")}
                className={
                  terminalSel === "1"
                    ? "rounded-xl px-3 py-1 bg-[#37375f]"
                    : "rounded-xl px-3 py-1 bg-[#1c1c1f]"
                }
              >
                <Text className="text-neutral-300 font-normal text-lg">
                  Terminal 1
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setTerminalSel("2")}
                className={
                  terminalSel === "2"
                    ? "rounded-xl px-3 py-1 bg-[#37375f]"
                    : "rounded-xl px-3 py-1 bg-[#1c1c1f]"
                }
              >
                <Text className="text-neutral-300 font-normal text-lg">
                  Terminal 2
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setTerminalSel("4")}
                className={
                  terminalSel === "4"
                    ? "rounded-xl px-3 py-1 bg-[#37375f]"
                    : "rounded-xl px-3 py-1 bg-[#1c1c1f]"
                }
              >
                <Text className="text-neutral-300 font-normal text-lg">
                  Terminal 4
                </Text>
              </Pressable>
            </View>
            <Text className="text-neutral-300 text-base">
              Terminal {terminalSel} (
              {terminalSel === "1"
                ? `${terminal1?.length} `
                : terminalSel === "2"
                  ? `${terminal2?.length} `
                  : `${terminal4?.length} `}
              llegadas) - actualizado a las {terminalRefresh.slice(-5)}
            </Text>
            {terminalSel === "1" && <Terminal terminal={terminal1} />}
            {terminalSel === "2" && <Terminal terminal={terminal2} />}
            {terminalSel === "4" && <Terminal terminal={terminal4} />}
          </>
        )}
        {category === "events" && <Events events={events} />}
        {category === "trains" && (
          <Text className="text-white">
            Pronto tendremos los últimos viajes de Madrid
          </Text>
        )}
      </View>
    </Screen>
  );
}
