import { Stack } from "expo-router";

export default function DetailsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitle: "",
                headerTintColor: "#fff",
                headerBackTitle: "Volver",

                // headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name="details" />
        </Stack>
    )
}
