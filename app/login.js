import { Text, TextInput, View, Pressable } from "react-native";
import Screen from "../components/Screen";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  function login() {
    // router.navigate("/index");
  }
  return (
    <Screen>
      <Text className="text-white font-semibold text-2xl">Inicia Sesion</Text>
      <View className="flex flex-col gap-2 mt-5 gap-y-4">
        <TextInput
          className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 w-full
          placeholder:text-neutral-400"
          placeholder={"dorian.esp@gmail.com"}
          inputMode="email"
          autoCapitalize="none"
        />
        <View className="relative">
          <TextInput
            className="text-white text-lg rounded-2xl border-[0.5px] border-neutral-700 bg-[#1a1a1c] p-3 pr-10 w-full placeholder:text-neutral-400"
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            // {...props}
          />
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3"
            hitSlop={10}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#aaa"
            />
          </Pressable>
        </View>
        <Pressable onPress={login} className="bg-green-400 p-4 rounded-2xl">
          <Text className="font-semibold text-center text-lg">
            Inciar sesión
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
