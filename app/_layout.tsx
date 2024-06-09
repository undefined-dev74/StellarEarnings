import Colors from "@/constants/Colors";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { UserInactivityProvider } from "@/context/UserInactivity";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      // ✅ globally default to 5 seconds
      staleTime: 5 * 1000,
    },
  },
});

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const { authState } = useAuth();
  const segments = useSegments();

  // const clearSecureStore = async () => {
  //   await SecureStore.deleteItemAsync("my-key");
  //   await SecureStore.deleteItemAsync("REFRESH_TOKEN");
  //   console.log("SecureStore cleared");
  // };

  // clearSecureStore();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!authState?.authenticated) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (authState.authenticated) {
      router.replace("/(authenticated)/(tabs)/home");
    } else if (!authState.authenticated) {
      router.replace("/");
    }
  }, [authState?.authenticated]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='signup'
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='arrow-back' size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name='login'
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='arrow-back' size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={"/help"} asChild>
              <TouchableOpacity>
                <Ionicons name='help-circle-outline' size={34} color={Colors.dark} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Stack.Screen name='help' options={{ title: "Help", presentation: "modal" }} />

      <Stack.Screen
        name='verify/[phone]'
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='arrow-back' size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name='(authenticated)/(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(authenticated)/crypto/[id]'
        options={{
          title: "",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='arrow-back' size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          headerTransparent: true,
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity>
                <Ionicons name='notifications-outline' color={Colors.dark} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name='star-outline' color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='(authenticated)/investmentDetails/[id]'
        options={{
          title: "Investment Details",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='arrow-back' size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name='(authenticated)/withdrawals'
        options={{
          title: "Fund Records",
          headerTitleAlign: "center",
          headerLeft: () => (
            <View style={{ marginRight: 20 }}>
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' size={20} color={Colors.dark} />
              </TouchableOpacity>
            </View>
          ),
          headerLargeTitle: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen name='(authenticated)/(modals)/lock' options={{ headerShown: false, animation: "none" }} />
      <Stack.Screen
        name='(authenticated)/(modals)/account'
        options={{
          presentation: "transparentModal",
          animation: "fade",
          title: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='close-outline' size={34} color={"#fff"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name='(authenticated)/deposit'
        options={{
          title: "Deposit Record",
          headerLeft: () => (
            <View style={{ marginRight: 20 }}>
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' size={20} color={Colors.dark} />
              </TouchableOpacity>
            </View>
          ),
          headerLargeTitle: true,
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name='(authenticated)/orders'
        options={{
          title: "Fund Record",
          headerLeft: () => (
            <View style={{ marginRight: 20 }}>
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' size={20} color={Colors.dark} />
              </TouchableOpacity>
            </View>
          ),
          headerLargeTitle: true,
          headerTransparent: false,
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <UserInactivityProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
              <InitialLayout />
            </AuthProvider>
            <StatusBar style='light' />
          </GestureHandlerRootView>
        </UserInactivityProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
