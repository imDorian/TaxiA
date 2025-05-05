import { Text, View, ScrollView, Pressable, Image } from "react-native";
import Screen from "../../components/Screen";
import { useState, useEffect, useRef } from "react";
import { get } from "../../functions/bbdd";
import logo from '../../assets/logo.png'
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [weather, setWeather] = useState({});

    const scrollViewRef = useRef(null);
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);


    async function receiveMessage() {
        const data = await get("chat", "message");
        const json = JSON.parse(data);
        json.map((message) => {
            setMessages((prev) => [...prev, { message: message.nombre, tipo: message.tipo, ubicacion: message.ubicacion, distancia_km: message.distancia_km, nivel_afluencia: message.nivel_afluencia, motivo: message.motivo, recomendado: message.recomendado }]);
        });
    }

    async function getWeather() {
        const data = await get("chat", "weather");
        setWeather(data);
    }

    useEffect(() => {
        getWeather();
    }, []);




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
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    className="flex-1 rounded-2xl ">
                    <View className="flex flex-col items-center justify-start  min-h-full min-w-full rounded-2xl ">

                        <View className="flex flex-col justify-start items-start min-w-full p-2 gap-y-2 min-h-full">
                            {messages?.map((message, index) => (
                                <Text key={index} className="text-white text-base bg-blue-700 rounded-xl shadow-2xl shadow-black py-1 px-2">
                                    {message.message}
                                    {'\n'}
                                    {message.tipo}
                                    {'\n'}
                                    {message.ubicacion}
                                    {'\n'}
                                    A {message.distancia_km} km
                                    {'\n'}
                                    Afluencia: {message.nivel_afluencia}
                                    {'\n'}
                                    Motivo: {message.motivo}
                                    {'\n'}
                                    {message.recomendado ? ' Recomendado' : ' No recomendado'}.
                                </Text>
                            ))}
                            {messages.length === 0 && (
                                <Text className="text-white text-base bg-blue-700 rounded-xl shadow-2xl shadow-black py-1 px-2">
                                    Soy tu asistente virtual de TaxiA. Estoy aquí para ayudarte a encontrar clientes y gestionar tus viajes. ¿En qué puedo ayudarte hoy?
                                </Text>
                            )}

                        </View>
                    </View>
                </ScrollView>
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
