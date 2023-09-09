import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";
import Categories from "@/components/categories";
import Restaurants from "@/components/restaurants";
import Colors from "@/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CustomHeader from "@/components/customHeader";

const Page = () => {
  const inset = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader />
      <ScrollView
        style={{ marginTop: 120 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Categories />
        <Text style={styles.header}>Top pick in your neighborhood</Text>
        <Restaurants />
        <Text style={styles.header}>Offers near you</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
export default Page;
