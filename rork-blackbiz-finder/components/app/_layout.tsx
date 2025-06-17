import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";
import Colors from "@/constants/colors";
import { Platform } from "react-native";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.background,
            },
            headerTintColor: Colors.primary,
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            // Web-specific optimizations
            ...(Platform.OS === 'web' && {
              headerShown: true,
              animation: 'slide_from_right',
            }),
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="business/[id]" 
            options={{ 
              title: "Business Details",
              headerBackTitle: "Back",
            }} 
          />
          <Stack.Screen 
            name="category/[id]" 
            options={{ 
              title: "Category",
              headerBackTitle: "Back",
            }} 
          />
          <Stack.Screen 
            name="subscription" 
            options={{ 
              title: "List Your Business",
              presentation: Platform.OS === 'web' ? 'card' : 'modal',
            }} 
          />
          <Stack.Screen 
            name="auth" 
            options={{ 
              title: "Sign In",
              presentation: Platform.OS === 'web' ? 'card' : 'modal',
            }} 
          />
          <Stack.Screen 
            name="payment" 
            options={{ 
              title: "Payment",
              presentation: Platform.OS === 'web' ? 'card' : 'modal',
              headerBackTitle: "Back",
            }} 
          />
          <Stack.Screen 
            name="web-browser" 
            options={{ 
              title: "Browser",
              headerShown: false,
            }} 
          />
        </Stack>
      </QueryClientProvider>
    </trpc.Provider>
  );
}