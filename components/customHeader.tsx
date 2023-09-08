import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.serchSection}>
      <View style={styles.serachField}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color={Colors.medium}
        />
        <TextInput
          style={styles.input}
          placeholder="Restaurants, groceries, dishes"
        />
      </View>
      <Link href={"/"} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);
const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.bike}
            source={require("@/assets/images/bike.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer}>
          <Text style={styles.title}>Derivery · Now</Text>
          <View style={styles.locationName}>
            <Text style={styles.subTitle}>London</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  bike: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  profileButton: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationName: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    height: 60,
    backgroundColor: "white",
  },
  serchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  serachField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
  input: {
    padding: 10,
    color: Colors.mediumDark,
  },
  searchIcon: {
    paddingLeft: 10,
  },
});

export default CustomHeader;
