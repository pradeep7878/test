import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import HeaderWithOutBS from "../../components/HeaderWithOutBS";
import { images } from "../../constants";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const VaughanInfo = ({navigation}) => {
  const items = [
    {
      id: 1,
      name: "Load 1",      
      image: images.truck,
      from: 'Tenkasi, India',
      to: 'Coimbatore, India',
      loadPrice: '20000',
      spend: '2000',
      balance: '18000'
    },
    {
      id: 2,
      name: "Load 2",      
      image: images.truck,
      from: 'Tenkasi, India',
      to: 'Coimbatore, India',
      loadPrice: '20000',
      spend: '2000',
      balance: '18000'
    },
    {
      id: 3,
      name: "Load 3",      
      image: images.truck,
      from: 'Tenkasi, India',
      to: 'Coimbatore, India',
      loadPrice: '20000',
      spend: '2000',
      balance: '18000'
    },
  ];

  const renderDetailsButton = (item) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => handleDetailsPress(item)}>
        <Text style={styles.buttonText}>View Full Details</Text>
      </TouchableOpacity>
    );
  };

  const handleDetailsPress = (item) => {
    navigation.navigate("LoadExpenseCalculator", { item });       
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.item}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>From:</Text>
              <Text style={styles.tableValue}>{item.from}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>To:</Text>
              <Text style={styles.tableValue}>{item.to}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Load Price:</Text>
              <Text style={styles.tableValue}>{item.loadPrice}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Spend:</Text>
              <Text style={styles.tableValue}>{item.spend}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Balance:</Text>
              <Text style={styles.tableValue}>{item.balance}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        {renderDetailsButton(item)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderWithOutBS title="Expense Calculator" />
        <View style={styles.container}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // keyExtractor should return a string
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
    marginTop: 10,
  },
  card: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tableLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  tableValue: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VaughanInfo;
