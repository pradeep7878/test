import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import axiosInstance from "../../services/axiosInstance";

const ProductCategoryList = ({ navigation, searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [marketPlaceProducts, setMarketPlaceProducts] = useState([]);
  useEffect(() => {
    const getMarketPlaceProducts = async () => {
      try {
        const response = await axiosInstance.get("/all_buy_sell_details");
        if (response.data.error_code === 0) {
          setMarketPlaceProducts(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMarketPlaceProducts();
  }, []);

  const onPressCategory = () => {
    navigation.navigate("TruckDetails");
  };

  const filteredProducts = marketPlaceProducts.filter((product) =>
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategory(item)}>
      <View style={styles.categoryItem}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.brand}</Text>
          <Text style={styles.categoryDescription}>{item.model}</Text>
          <Text style={styles.categoryPrice}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return loading ? (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      size="large"
      color="#0000ff"
    />
  ) : filteredProducts.length === 0 ? (
    <Text style={styles.noProductsText}>No truck details found</Text>
  ) : (
    <View style={{ flex: 1, marginBottom: 55 }}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        contentInset={{ bottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  noProductsText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
  },
  categoryItem: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  categoryPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
  } 
});

export default ProductCategoryList;
