import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import useBasketStore from "@/store/basketStore";
import { FlatList } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import ConfettiCannon from "react-native-confetti-cannon";
import { Link } from "expo-router";

const Basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);
  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };
  const startCheckOut = () => {
    setOrder(true);
    clearCart();
  };
  return (
    <>
      {order ? (
        <>
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            fallSpeed={2500}
            fadeOut
          />
          <View style={{ marginTop: "50%", padding: 20, alignItems: "center" }}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
            >
              Thank you for your order!
            </Text>
            <Link href="/" asChild>
              <TouchableOpacity style={styles.orderBtn}>
                <Text style={styles.footerText}>New order</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </>
      ) : (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={<Text style={styles.section}>Items</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            ListFooterComponent={
              <View>
                <View style={{ height: 1, backgroundColor: Colors.grey }} />
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text style={{ fontSize: 18 }}>${total}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Service fee</Text>
                  <Text style={{ fontSize: 18 }}>${FEES.service}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Delivery fee</Text>
                  <Text style={{ fontSize: 18 }}>${FEES.delivery}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Order Total</Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    ${(total + FEES.delivery + FEES.service).toFixed(2)}
                  </Text>
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  {item.quantity}x
                </Text>
                <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                <Text style={{ fontSize: 18 }}>
                  {item.price * item.quantity}
                </Text>
              </View>
            )}
          />
          <View style={styles.footer}>
            <SafeAreaView edges={["bottom"]}>
              <TouchableOpacity
                style={styles.fullButton}
                onPress={startCheckOut}
              >
                <Text style={styles.footerText}>Order now</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: Colors.medium,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 0,
    padding: 10,
    elevation: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderBtn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 50,
  },
});

export default Basket;
