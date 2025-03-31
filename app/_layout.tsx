import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./Auth.native";
import { UserDataProvider } from "./UserDataContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      // Redirect to the login page if not signed in
      router.push("/login");
    }
  }, [user, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ animation: 'fade' }} />
      <Stack.Screen name="index" options={{ animation: 'fade' }} />
      <Stack.Screen name="sessionDetails" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="liveSessionDetails" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <UserDataProvider>
          <RootLayoutNav />
        </UserDataProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
