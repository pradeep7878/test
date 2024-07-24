import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import HeaderWithOutBS from "../../components/HeaderWithOutBS";
import SearchFilter from "../../components/SearchFilter";
import CustomButton from "../../components/CustomButton";
import DriverDetails from "./DriverDetails";
import axiosInstance from "../../services/axiosInstance";
import { LoadNeedsContext } from "../../hooks/LoadNeedsContext";

const AvailableDrivers = ({ navigation }) => {
  const { isLoading } = useContext(LoadNeedsContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [driversData, setDriversData] = useState([]);
  const [isLoadings, setisLoadings] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValues, setModalValues] = useState({
    driverName: "",
    fromLocation: "",
    toLocation: "",
    vehicleNumber: "",
    noOfTyres: "",
    truckBodyType: "",
    truckName: "",
  });
  const [errorFields, setErrorFields] = useState({
    driverName: false,
    fromLocation: false,
    toLocation: false,
    vehicleNumber: false,
    noOfTyres: false,
    truckBodyType: false,
    truckName: false,
  });

  const navigateToSellYourTruck = () => {
    navigation.navigate("DriverNeeds");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const getAllDrivers = async () => {
      try {
        const response = await axiosInstance.get("/all_driver_details");
        if (response.data.error_code === 0) {
          const transformedData = response.data.data.map((item) => ({
            title: item.driver_name,
            fromLocation: item.from_location,
            toLocation: item.to_location,
            labels: [
              { icon: "directions-bus", text: item.vehicle_number },
              { icon: "attractions", text: item.no_of_tyres },
              { icon: "local-shipping", text: item.truck_body_type },
              { icon: "verified", text: item.truck_name },
            ],
            description: item.description,
            onButton1Press: () => Linking.openURL(`tel:${item.contact_no}`),
            onButton2Press: () => alert("Button 2 pressed for Truck 1"),
          }));

          setDriversData(transformedData);
        } else {
          console.error(
            "Error fetching all loads:",
            response.data.error_message
          );
        }
      } catch (error) {
        console.error("Error fetching all drivers:", error);
      } finally {
        setisLoadings(false); 
      }
    };

    getAllDrivers();
  }, [isLoading]);

  const filteredTrucks = driversData.filter(
    (truck) =>
      truck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.fromLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.toLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    // Reset modal values and error fields when modal opens/closes
    setModalValues({
      driverName: "",
      fromLocation: "",
      toLocation: "",
      vehicleNumber: "",
      noOfTyres: "",
      truckBodyType: "",
      truckName: "",
    });
    setErrorFields({
      driverName: false,
      fromLocation: false,
      toLocation: false,
      vehicleNumber: false,
      noOfTyres: false,
      truckBodyType: false,
      truckName: false,
    });
  };


  const handleInputChange = (field, value) => {
    setModalValues({ ...modalValues, [field]: value });
    setErrorFields({ ...errorFields, [field]: false });
  };



  const applyFilter = () => {
    // Validate inputs
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

    // Implement your logic here to use modalValues, e.g., submit form data
    toggleModal(); // Close modal after applying filter
  };

  if (isLoadings) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderWithOutBS title="Available Drivers" />
        <View style={styles.container}>
          <CustomButton
            title="Post Driver Details"
            onPress={navigateToSellYourTruck}
            backgroundColor="#8a1c33"
            textColor="white"
          />
          <CustomButton
            title="Filter"
            backgroundColor="#8a1c33"
            onPress={toggleModal}
            textColor="white"
          />
        </View>
        <SearchFilter onSearch={handleSearch} />
        <DriverDetails
          navigation={navigation}
          filteredTrucks={filteredTrucks}
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
              style={[styles.input, errorFields.driverName && styles.inputError]}
              placeholder="Driver Name"
              value={modalValues.driverName}
              onChangeText={(text) => handleInputChange('driverName', text)}
            />
            <TextInput
              style={[styles.input, errorFields.fromLocation && styles.inputError]}
              placeholder="From Location"
              value={modalValues.fromLocation}
              onChangeText={(text) => handleInputChange('fromLocation', text)}
            />
            <TextInput
              style={[styles.input, errorFields.toLocation && styles.inputError]}
              placeholder="To Location"
              value={modalValues.toLocation}
              onChangeText={(text) => handleInputChange('toLocation', text)}
            />
            <TextInput
              style={[styles.input, errorFields.vehicleNumber && styles.inputError]}
              placeholder="Vehicle Number"
              value={modalValues.vehicleNumber}
              onChangeText={(text) => handleInputChange('vehicleNumber', text)}
            />
            <TextInput
              style={[styles.input, errorFields.noOfTyres && styles.inputError]}
              placeholder="Number of Tyres"
              value={modalValues.noOfTyres}
              onChangeText={(text) => handleInputChange('noOfTyres', text)}
            />
            <TextInput
              style={[styles.input, errorFields.truckName && styles.inputError]}
              placeholder="Truck Name"
              value={modalValues.truckName}
              onChangeText={(text) => handleInputChange('truckName', text)}
            />
            <TextInput
              style={[styles.input, errorFields.truckBodyType && styles.inputError]}
              placeholder="Truck Body Type"
              value={modalValues.truckBodyType}
              onChangeText={(text) => handleInputChange('truckBodyType', text)}
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
  centeredContainer: {
    flex: 1,
    backgroundColor: "#e8f4ff",
    justifyContent: "center",
    alignItems: "center",
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
  closeButton:{
    backgroundColor: "#8a1c33",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AvailableDrivers;
