import { Pressable, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavBar } from './NavBar'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'react-native-svg'
import logo from '../assets/logo.png'

export default function Screen({ children }) {
    const insets = useSafeAreaInsets()
    return (
        <View className="flex-1 items-center px-5 bg-[#0f0f11]">
            <Stack.Screen options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#0f0f11",
                    height: insets.top + 2,
                },
                headerTitle: "",
                headerTitleStyle: {
                    color: "#fff",
                    fontSize: 20,
                },
            }} />
            {children}
            {/* <NavBar /> */}
        </View>
    )
}

