import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Categories from "@/components/categories";
import Restaurants from "@/components/restaurants";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "@/components/customHeader";

const Page = () => {
  const inset = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={{ height: inset.top, backgroundColor: "white" }} />
      <CustomHeader />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <Categories />
          <Text style={styles.header}>Top pick in your neighborhood</Text>
          <Restaurants />
          <Text style={styles.header}>Offers near you</Text>
          <Restaurants />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    height: "100%",
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
