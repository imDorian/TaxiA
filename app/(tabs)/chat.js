import { Text, View, Pressable, Image, FlatList, Linking, PermissionsAndroid, Platform } from "react-native";
import Screen from "../../components/Screen";
import { useState, useEffect, useRef } from "react";
import { get } from "../../functions/bbdd";
import logo from '../../assets/logo.png'
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { io } from "socket.io-client";
import { getGeoHash } from "../../functions/getGeoHash";
export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [weather, setWeather] = useState({});
    const scrollViewRef = useRef(null);
    const socketRef = useRef(null);
    const [location, setLocation] = useState({
        geoPoint: "",
        latitude: 0,
        longitude: 0
    });

    const getGeo = async () => {
        try {
            const geo = getGeoHash();
            geo.then(({ geoPoint, latitude, longitude }) => {
                setLocation({ geoPoint, latitude, longitude });
                getWeather(latitude, longitude);
            });
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getGeo();
    }, []);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    useEffect(() => {
        socketRef.current = io(process.env.URL);
        socketRef.current.on("newMessage", (message) => {
            setMessages((prev) => [...prev, message])

        });
        socketRef.current.on("connect", () => {
            console.log("Conexión establecida con el servidor");
        });
        socketRef.current.on("disconnect", () => {
            console.log("Conexión cerrada con el servidor");
        });
        return () => {
            socketRef.current.close();
        };
    }, []);



    async function receiveMessage() {
        console.log(location.geoPoint)
        const data = await get("chat", "message", `geoPoint=${location.geoPoint}`);
        console.log(data)
    }

    async function getWeather(latitude, longitude) {
        console.log(latitude, "latitude", longitude, "longitude ggggggggg")
        const data = await get("chat", "weather", `lat=${latitude}&lon=${longitude}`);
        // console.log(data)
        setWeather(data);
    }





    return (
        <Screen>
            <View className="flex flex-row justify-between min-w-full">
                <View className="flex flex-col justify-center items-start">
                    <Text className="text-white text-base font-bold">{capitalizeFirstLetter(weather?.weather)} {weather.temperature?.toFixed(0)}º</Text>
                    <Text className="text-white text-sm">{weather?.zone}, {weather?.country}</Text>
                </View>
                <View className="flex flex-row justify-start items-center py-2">
                    <Image source={logo} className="w-10 h-10" />
                    <Text className="text-white font-bold italic flex flex-row justify-center items-center text-sm ">TaxiA</Text>
                </View>
            </View>
            <View className="flex-col justify-center items-center gap-3 pb-20 min-h-full max-h-full ">
                <FlatList
                    data={messages}
                    renderItem={({ item }) => {
                        const wazeUrl = `https://waze.com/ul?q=${item.street},${item.city},${item.country}`;
                        const googleMapsUrl = `https://maps.google.com/?q=${item.street},${item.city},${item.country}`;
                        return (
                            <View className="flex flex-col bg-neutral-900 rounded-xl p-3 max-w-full min-w-full gap-y-2">
                                <View className="flex flex-row justify-start items-center gap-x-2 overflow-ellipsis overflow-hidden min-w-full max-w-full text-nowrap">
                                    <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full" />
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        className="text-white font-semibold text-lg w-3/4">{item.name}</Text>
                                </View>
                                <View className="flex flex-row min-w-full max-w-full p-3 bg-[#1a1a1a] rounded-2xl shadow-2xl shadow-black">
                                    <View className="flex flex-col justify-start items-start w-1/2">
                                        <Text className="text-white font-semibold text-wrap text-base">{item.venue}</Text>
                                        <Text className="text-white text-wrap text-sm">{item.street}</Text>

                                    </View>
                                    <View className="flex flex-col justify-start items-end  w-1/2">
                                        <Text className="text-white font-medium text-wrap text-base">{new Date(item.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
                                        <Text className="text-white text-wrap text-sm">{item.city}, {item.country}</Text>
                                        <Text className="text-white font-medium text-wrap text-sm">{item.distance} km</Text>
                                    </View>
                                </View>
                                <View className="flex flex-row justify-center items-center gap-x-2 mt-1">
                                    <Pressable onPress={() => Linking.openURL(googleMapsUrl)} className="bg-blue-600 rounded-xl w-1/2 p-2">
                                        <Text className="text-white text-center text-base">Ver en Google Maps</Text>
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL(wazeUrl)} className="bg-blue-600 rounded-xl w-1/2 p-2">
                                        <Text className="text-white text-center text-base">Ver en Waze</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }
                    }
                    contentContainerStyle={{ padding: 10 }}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    ListEmptyComponent={() => (
                        <Text className="text-white text-lg bg-[#1a1a1a] rounded-xl shadow-2xl shadow-black py-1 px-2">
                            Soy tu asistente virtual de TaxiA. Estoy aquí para ayudarte a encontrar clientes y gestionar tus viajes. ¿En qué puedo ayudarte hoy?
                        </Text>
                    )}
                />
                {/* <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    className="flex-1 rounded-2xl ">
                    <View className="flex flex-col items-center justify-start  min-h-full min-w-full rounded-2xl ">

                        <View className="flex flex-col justify-start items-start min-w-full p-2 gap-y-2 min-h-full">
                            {messages?.map((message, index) => (
                                <Text key={index} className="text-white text-base bg-blue-700 rounded-xl shadow-2xl shadow-black py-1 px-2">
                                    {message.name}
                                </Text>
                            ))}
                            {messages.length === 0 && (
                                <Text className="text-white text-base bg-blue-700 rounded-xl shadow-2xl shadow-black py-1 px-2">
                                    Soy tu asistente virtual de TaxiA. Estoy aquí para ayudarte a encontrar clientes y gestionar tus viajes. ¿En qué puedo ayudarte hoy?
                                </Text>
                            )}

                        </View>
                    </View>
                </ScrollView> */}
                <View className="flex flex-row justify-around items-center min-w-full gap-x-2">
                    <Pressable className="bg-blue-600 rounded-xl w-1/2 p-2">
                        <Text className="text-white text-center text-base">Eventos</Text>
                    </Pressable>
                    <Pressable className="bg-blue-600 rounded-xl w-1/2 p-2">
                        <Text className="text-white text-center text-base">Estaciones</Text>
                    </Pressable>
                </View>
                <Pressable onPress={() => receiveMessage()} className="bg-blue-600 min-w-full rounded-2xl p-2">
                    <Text className="text-white text-center text-lg">Buscar clientes</Text>
                </Pressable>
            </View >
        </Screen >
    )
}       
