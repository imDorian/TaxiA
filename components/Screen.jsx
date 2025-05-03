import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavBar } from './NavBar'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export default function Screen({ children, title }) {
    const insets = useSafeAreaInsets()
    return (
        <View className="flex-1 justify-start items-start px-5  bg-[#0f0f11] gap-3">
            <Stack.Screen options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#0f0f11",
                    height: insets.top,
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

