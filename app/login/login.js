import { Text, TextInput, View, Pressable } from "react-native";
import Screen from "../../components/Screen";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import login from "../../functions/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleUserData(prop, value) {
    setUserData((prev) => ({
      ...prev,
      [prop]: value,
    }));
  }

  async function removeToken() {
    await AsyncStorage.removeItem("token");
  }

  useEffect(() => {
    removeToken();
  }, []);

  async function loginUser() {
    setLoading(true);
    if (userData.email && userData.password) {
      try {
        const token = await login(userData);
        await AsyncStorage.setItem("token", token); // espera a que se guarde el token
        router.replace("/(tabs)/"); // solo entonces navega
      } catch (error) {
        console.error("Error durante el login:", error);
      }
    } else {
      console.log("formulario incompleto");
    }
    setLoading(false);
  }

  return (
    <Screen className="pt-10">
      <Text className="text-white font-semibold text-2xl text-center">
        Bienvenido/a a TaxiA
      </Text>
      <View className="flex flex-col gap-y-6 mt-1">
        <Text className="text-neutral-400 text-center">
          Inicia sesión con tu cuenta de Google
        </Text>
        <Pressable
          disabled
          className="bg-blue-500 p-4 rounded-2xl disabled:opacity-50"
        >
          <Text className="text-center font-semibold text-white">
            Iniciar sesión con Google
          </Text>
        </Pressable>
      </View>
      <Text className="text-neutral-400 text-center mt-6 ">
        Ó continua con tu email
      </Text>
      <View className="flex flex-col mt-5 gap-y-5">
        <View className="flex flex-col gap-2">
          <Text className="text-white font-semibold text-lg">Email</Text>
          <TextInput
            className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 w-full
          placeholder:text-neutral-400"
            placeholder={"email@example.com"}
            inputMode="email"
            autoCapitalize="none"
            onChangeText={(value) => handleUserData("email", value)}
            value={userData.email}
          />
        </View>
        <View className="flex flex-col gap-2">
          <View className="flex flex-row justify-between">
            <Text className="text-white text-lg font-semibold">Contraseña</Text>
            <Pressable className="">
              <Text className="text-neutral-300">
                ¿Has olvidado la contraseña?
              </Text>
            </Pressable>
          </View>
          <View className="relative">
            <TextInput
              className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 pr-10 w-full placeholder:text-neutral-400"
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onChangeText={(value) => handleUserData("password", value)}
              value={userData.password}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3"
              hitSlop={10}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#aaa"
              />
            </Pressable>
          </View>
        </View>
        <Pressable
          disabled={loading}
          onPress={loginUser}
          className="bg-green-400 p-4 rounded-2xl disabled:opacity-50"
        >
          <Text className="font-semibold text-center text-white">
            Inciar sesión
          </Text>
        </Pressable>
        <View className="gap-y-1">
          <Text className="text-neutral-300 text-center">
            ¿Aun no tienes una cuenta de TaxiA?
          </Text>
          <Link href="/register/register">
            <Text className="text-white font-semibold text-center">
              Crear una cuenta
            </Text>
          </Link>
        </View>
      </View>
    </Screen>
  );
}
