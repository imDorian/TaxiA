import { KeyboardAvoidingView, Platform } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Screen({ children, ...props }) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
      style={{ flex: 1, backgroundColor: "#0f0f11", paddingHorizontal: 20 }}
      {...props}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          statusBarStyle: "light",
          headerTintColor: "#fff",
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#0f0f11",
            height: insets.top + 2,
          },

          // headerBackTitleVisible: false,
        }}
      />

      {children}
    </KeyboardAvoidingView>
  );
}
