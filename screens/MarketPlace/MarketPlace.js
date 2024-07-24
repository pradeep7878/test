import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import HeaderWithOutBS from "../../components/HeaderWithOutBS";
import MarketPlaceProducts from "./MarketPlaceProducts";
import SearchFilter from "../../components/SearchFilter";
import CustomButton from "../../components/CustomButton";

const MarketPlace = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValues, setModalValues] = useState({
    brand: "",
    model: "",
    location: "",
  });
  const [errorFields, setErrorFields] = useState({
    brand: false,
    model: false,
    location: false,
  });

  const navigateToSellYourTruck = () => {
    navigation.navigate("SellYourTruck");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);

    setModalValues({
      brand: "",
      model: "",
      location: "",
    });
    setErrorFields({
      brand: false,
      model: false,
      location: false,
    });
  };

  const handleInputChange = (field, value) => {
    setModalValues({ ...modalValues, [field]: value });
    setErrorFields({ ...errorFields, [field]: false });
  };

  const applyFilter = () => {
    let hasError = false;
    const errors = {};

    Object.keys(modalValues).forEach((key) => {
      if (!modalValues[key]) {
        errors[key] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrorFields(errors);
      return;
    }

    toggleModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderWithOutBS title="Market Place" />
        <View style={styles.container}>
          <CustomButton
            title="Sell your Truck"
            onPress={navigateToSellYourTruck}
            backgroundColor="#8a1c33"
            textColor="white"
          />
          <CustomButton
            title="Filter"
            onPress={toggleModal}
            backgroundColor="#8a1c33"
            textColor="white"
          />
        </View>
        <SearchFilter onSearch={handleSearch} />
        <MarketPlaceProducts
          navigation={navigation}
          searchQuery={searchQuery}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <TextInput
              style={[styles.input, errorFields.brand && styles.inputError]}
              placeholder="Brand"
              value={modalValues.brand}
              onChangeText={(text) => handleInputChange("brand", text)}
            />
            <TextInput
              style={[styles.input, errorFields.model && styles.inputError]}
              placeholder="Model"
              value={modalValues.model}
              onChangeText={(text) => handleInputChange("model", text)}
            />
            <TextInput
              style={[styles.input, errorFields.location && styles.inputError]}
              placeholder="location"
              value={modalValues.location}
              onChangeText={(text) => handleInputChange("location", text)}
            />

            <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
              <Text style={styles.applyButtonText}>Apply Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.applyButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    width: "80%",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  inputError: {
    borderColor: "red",
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#8a1c33",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default MarketPlace;
