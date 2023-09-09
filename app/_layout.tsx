import { Stack, useNavigation } from "expo-router";
import CustomHeader from "@/components/customHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modal)/filter"
            options={{
              presentation: "modal",
              headerTitle: "Filter",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              ...(Platform.OS == "android"
                ? {
                    headerRight: () => (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                          name="close-outline"
                          size={28}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    ),
                    headerLeft: () => <></>,
                  }
                : {
                    headerLeft: () => (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                          name="close-outline"
                          size={28}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    ),
                  }),
            }}
          />
          <Stack.Screen
            name="(modal)/location-search"
            options={{
              presentation: "fullScreenModal",
              headerTitle: "Select Location",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              ...(Platform.OS == "android"
                ? {
                    headerRight: () => (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                          name="close-outline"
                          size={28}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    ),
                    headerLeft: () => <></>,
                  }
                : {
                    headerLeft: () => (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                          name="close-outline"
                          size={28}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    ),
                  }),
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  );
}
