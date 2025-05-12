import { Pressable, Text, View, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavBar } from './NavBar'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'react-native-svg'
import logo from '../assets/logo.png'

export default function Screen({ children }) {
    const insets = useSafeAreaInsets()
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 50}
            style={{ flex: 1, backgroundColor: "#0f0f11", paddingHorizontal: 20 }}
        >
            <Stack.Screen options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#0f0f11",
                    height: insets.top + 2,
                }
                // headerBackTitleVisible: false,

            }} />

            {children}
        </KeyboardAvoidingView>
    )
}

