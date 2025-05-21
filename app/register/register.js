import { Pressable, Text, View, TextInput, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import register from "../../functions/register";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
    pass: "",
    number: "",
    form: "",
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPass: "",
    name: "",
    lastname: "",
    number: "",
  });

  function handleUserData(prop, value) {
    setUserData((prev) => ({
      ...prev,
      [prop]: value,
    }));
  }

  function goBack() {
    router.back();
  }

  async function registerUser() {
    try {
      setLoading(true);
      setError({
        email: "",
        number: "",
        pass: "",
        form: "",
      });
      if (
        userData.name &&
        userData.email &&
        userData.password &&
        userData.confirmPass
      ) {
        if (userData.password === userData.confirmPass) {
          register(userData).then((value) => {
            if (value.error === "email") {
              setError((prev) => ({
                ...prev,
                email: "El email ya existe",
              }));

              return;
            }
            if (value.error === "number") {
              setError((prev) => ({
                ...prev,
                number: "El teléfono ya existe",
              }));
              return;
            }
            if (value.user === "created") {
              router.back();
            }
          });
        } else {
          setError((prev) => ({
            ...prev,
            pass: "La contraseña debe ser igual",
          }));
        }
      } else {
        setError((prev) => ({
          ...prev,
          form: "Debes completar los datos obligatorios *",
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen className="">
      <ScrollView>
        <View className="pt-10 pb-20">
          <Text className="text-white font-semibold text-2xl text-center">
            Regístrate en TaxiA
          </Text>
          <View className="flex flex-col gap-y-6 mt-1">
            <Text className="text-neutral-400 text-center">
              Regístrate con tu cuenta de Google
            </Text>
            <Pressable
              disabled
              className="bg-blue-500 p-4 rounded-2xl disabled:opacity-50"
            >
              <Text className="text-center font-semibold text-white">
                Registrar con Google
              </Text>
            </Pressable>
          </View>
          <Text className="text-neutral-400 text-center mt-6 ">
            Ó continua con tu email
          </Text>
          <View className="flex flex-col mt-5 gap-y-5">
            <View className="flex flex-col gap-2">
              <Text className="text-white font-semibold text-lg">Nombre *</Text>
              <TextInput
                className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 w-full
          placeholder:text-neutral-400"
                placeholder={"ej: Dorian"}
                inputMode="text"
                autoCapitalize="word"
                onChangeText={(value) => handleUserData("name", value)}
                value={userData.name}
              />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-white font-semibold text-lg">
                Apellidos
              </Text>
              <TextInput
                className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 w-full
          placeholder:text-neutral-400"
                placeholder={"ej: Silisteanu"}
                inputMode="text"
                autoCapitalize="words"
                onChangeText={(value) => handleUserData("lastname", value)}
                value={userData.lastname}
              />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-white font-semibold text-lg">Teléfono</Text>
              <TextInput
                className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 w-full
          placeholder:text-neutral-400"
                placeholder={"+34 684..."}
                inputMode="numeric"
                autoCapitalize="none"
                onChangeText={(value) => handleUserData("number", value)}
                value={userData.number}
              />
              <Text
                className={error.number ? "text-red-300 text-center" : "hidden"}
              >
                {error.number}
              </Text>
            </View>
            <View className="flex flex-col gap-2">
              <Text className="text-white font-semibold text-lg">Email *</Text>
              <TextInput
                className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 w-full
          placeholder:text-neutral-400"
                placeholder={"email@example.com"}
                inputMode="email"
                autoCapitalize="none"
                onChangeText={(value) => handleUserData("email", value)}
                value={userData.email}
                autoComplete="email"
              />
              <Text
                className={error.email ? "text-red-300 text-center" : "hidden"}
              >
                {error.email}
              </Text>
            </View>

            <View className="flex flex-col gap-2">
              <View className="flex flex-row justify-between">
                <Text className="text-white text-lg font-semibold">
                  Contraseña *
                </Text>
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
            <View className="flex flex-col gap-2">
              <View className="flex flex-row justify-between">
                <Text className="text-white text-lg font-semibold">
                  Confirmar contraseña *
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 pr-10 w-full placeholder:text-neutral-400"
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  onChangeText={(value) => handleUserData("confirmPass", value)}
                  value={userData.confirmPass}
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
              <Text
                className={error.pass ? "text-red-300 text-center" : "hidden"}
              >
                {error.pass}
              </Text>
            </View>
            <Pressable
              onPress={registerUser}
              className="bg-green-400 p-4 rounded-2xl disabled:opacity-50"
              disabled={loading}
            >
              <Text className="font-semibold text-center text-white">
                {loading ? "Creando usuario..." : "Registrarme con email"}
              </Text>
            </Pressable>
            <Text
              className={error.form ? "text-red-300 text-center" : "hidden"}
            >
              {error.form}
            </Text>
            <View className="gap-y-1">
              <Text className="text-neutral-300 text-center">
                ¿Ya tienes una cuenta de TaxiA?
              </Text>
              <Pressable onPress={goBack}>
                <Text className="text-white font-semibold text-center">
                  Iniciar sesión
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
