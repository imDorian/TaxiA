import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export function NavBar() {
    return (
        <View className="absolute bottom-0 left-0 right-0 bg-[#0f0f11] p-4">
            <View className="flex-row justify-between items-center">
                <Link asChild href="/">
                    <Pressable className="flex-1 justify-center items-center">
                        {({ pressed }) => (
                            <Text className={`text-white text-lg font-normal ${pressed ? 'opacity-50' : 'opacity-100'}`}>Facturación</Text>
                        )}
                    </Pressable>
                </Link>
                <Link asChild href="/chat">
                    <Pressable className="flex-1 justify-center items-center">
                        {({ pressed }) => (
                            <Text className={`text-white text-lg font-normal ${pressed ? 'opacity-50' : 'opacity-100'}`}>IA</Text>
                        )}
                    </Pressable>
                </Link>
                <Link asChild href="/settings">
                    <Pressable className="flex-1 justify-center items-center">
                        {({ pressed }) => (
                            <Text className={`text-white text-lg font-normal ${pressed ? 'opacity-50' : 'opacity-100'}`}>Ajustes</Text>
                        )}
                    </Pressable>
                </Link>
            </View >
        </View >
    )
}