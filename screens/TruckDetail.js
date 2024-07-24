import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithOutBS from "../components/HeaderWithOutBS";
import { COLORS } from "../constants";

const TruckDetail = () => {
  const productData = {
    name: "Ashok Leyland Lorry",
    price: "₹ 34,00,000",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    model: "2003",
    status: "Available",
    location: "Coimbatore, Tamilnadu",
    images: [
      "https://bootdey.com/img/Content/avatar/avatar6.png",
      "https://bootdey.com/img/Content/avatar/avatar2.png",
      "https://bootdey.com/img/Content/avatar/avatar3.png",
    ],
  };

  const [selectedImage, setSelectedImage] = useState(productData.images[0]);

  const renderImages = () => {
    return (
      <View style={styles.imagesContainer}>
        <View style={styles.mainImageContainer}>
          <Image style={styles.mainImage} source={{ uri: selectedImage }} />
        </View>
        <View style={styles.smallImagesContainer}>
          {productData.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(image)}
              style={styles.smallImageContainer}
            >
              <Image style={styles.smallImage} source={{ uri: image }} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HeaderWithOutBS title="Truck Details" />
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <View style={styles.productCardHeader}>
              <Text style={styles.name}>{productData.name}</Text>
              <Text style={styles.price}>{productData.price}</Text>
            </View>
            <View style={styles.cardContent}>
              {renderImages()}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Model</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.description}>{productData.model}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Status</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.description}>{productData.status}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Location</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.description}>{productData.location}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Description</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.description}>{productData.description}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginLeft: 10,
    marginRight: 10,    
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  productCardHeader: {
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  name: {
    fontSize: 22,
    color: "#696969",
    fontWeight: "bold",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  cardContent: {
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardTitle: {
    color: COLORS.brand,
  },
  description: {
    fontSize: 18,
    color: "#696969",
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: COLORS.brand,
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  imagesContainer: {
    alignItems: "center",
  },
  mainImageContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  mainImage: {
    width: 400,
    height: 400,
  },
  smallImagesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  smallImageContainer: {
    paddingHorizontal: 10,
  },
  smallImage: {
    width: 60,
    height: 60,
  },
});

export default TruckDetail;
