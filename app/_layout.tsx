import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#16213e",
        },
        headerTintColor: "#e84040",
        headerShadowVisible: false,
        headerTitle: "",
        contentStyle: {
          backgroundColor: "#1a1a2e",
        },
      }}
    />
  );
}
