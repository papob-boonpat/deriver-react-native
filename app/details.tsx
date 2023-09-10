import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import ParallaxScrollView from "@/components/parallaxScrollView";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Details = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="search-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  return (
    <>
      <ParallaxScrollView
        backgroundColor="white"
        style={{ flex: 1 }}
        parallaxHeaderHeight={250}
        renderBackground={() => (
          <Image
            source={restaurant.img}
            style={{ height: 300, width: "100%" }}
          />
        )}
        stickyHeaderHeight={100}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickeySectionText}>{restaurant.name}</Text>
          </View>
        )}
        contentBackgroundColor={Colors.lightGrey}
      >
        <View style={styles.detailsContainer}>
          <Text>Detaild</Text>
        </View>
      </ParallaxScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
  stickySection: {
    backgroundColor: "white",
    marginLeft: 70,
    height: 100,
    justifyContent: "flex-end",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  stickeySectionText: {
    fontSize: 20,
    margin: 10,
  },
});

export default Details;
