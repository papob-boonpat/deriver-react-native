import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import categories from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Hygine rating</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
  </>
);

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItem] = useState<Category[]>(categories);
  const [seleceted, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = seleceted.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }
    setSelected(selectedItems);
  }, [items]);
  const handleClearAll = () => {
    const updateItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItem(updateItems);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      display: flexWidth.value > 0 ? "flex" : "none",
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] };
  });

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        fillColor={Colors.primary}
        unfillColor="#fff"
        disableBuiltInState
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
        }}
        onPress={() => {
          const isChecked = items[index].checked;
          const updatedItem = [...items];
          updatedItem[index].checked = !isChecked;
          setItem(updatedItem);
        }}
        isChecked={item.checked}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
      />
      <View style={{ height: 76 }} />
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[styles.outlineButton, animatedStyles]}>
            <TouchableOpacity
              style={{
                height: "100%",
                justifyContent: "center",
              }}
              onPress={handleClearAll}
            >
              <Animated.Text style={[animatedText, styles.outlineButtonText]}>
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.fullButton}>
            <TouchableOpacity
              style={styles.DoneBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.footerText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  itemText: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  fullButton: {
    backgroundColor: Colors.primary,
    alignItems: "stretch",
    borderRadius: 8,
    flex: 1,
    height: 56,
    overflow: "hidden",
  },
  DoneBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: "stretch",
    justifyContent: "center",
    borderRadius: 8,
    height: 56,
    marginRight: 12,
  },
  outlineButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 16,
  },
});
export default Filter;
