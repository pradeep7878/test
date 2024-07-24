import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Modal, TextInput, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import HeaderWithOutBS from "../../components/HeaderWithOutBS";
import SearchFilter from "../../components/SearchFilter";
import CustomButton from "../../components/CustomButton";
import LoadDetails from "./LoadDetails";
import axiosInstance from "../../services/axiosInstance";
import { LoadNeedsContext } from "../../hooks/LoadNeedsContext";

const AvailableLoads = ({ navigation }) => {
  const { isLoading } = useContext(LoadNeedsContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [allLoadData, setAllLoadData] = useState([]);
  const [isLoadings, setisLoadings] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValues, setModalValues] = useState({
    companyName: "",
    fromLocation: "",
    toLocation: "",
    material: "",
    noOfTyres: "",
    tons: "",
    truckBodyType: ""
  });
  const [errorFields, setErrorFields] = useState({
    companyName: false,
    fromLocation: false,
    toLocation: false,
    material: false,
    noOfTyres: false,
    tons: false,
    truckBodyType: false
  });

  const navigateToSellYourTruck = () => {
    navigation.navigate("LoadNeeds");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const getAllLoads = async () => {
      try {
        const response = await axiosInstance.get("/all_load_details");
        if (response.data.error_code === 0) {
          const transformedData = response.data.data.map((item) => ({
            title: item.company_name,
            fromLocation: item.from_location,
            toLocation: item.to_location,
            labels: [
              { icon: "table-view", text: item.material },
              { icon: "attractions", text: item.no_of_tyres },
              { icon: "monitor-weight", text: item.tone },
              { icon: "local-shipping", text: item.truck_body_type },
            ],
            description: item.description,
            onButton1Press: () => Linking.openURL(`tel:${item.contact_no}`),
            onButton2Press: () =>
              alert("Message Content will be displayed here..."),
          }));

          setAllLoadData(transformedData);
        } else {
          console.error(
            "Error fetching all loads:",
            response.data.error_message
          );
        }
      } catch (error) {
        console.error("Error fetching all loads:", error);
      } finally {
        setisLoadings(false); 
      }
    };

    getAllLoads();
  }, [isLoading]);

  const filteredTrucks = allLoadData.filter(
    (truck) =>
      truck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.fromLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.toLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    // Reset modal values and error fields when modal opens/closes
    setModalValues({
      companyName: "",
      fromLocation: "",
      toLocation: "",
      material: "",
      noOfTyres: "",
      tons: "",
      truckBodyType: ""
    });
    setErrorFields({
      companyName: false,
      fromLocation: false,
      toLocation: false,
      material: false,
      noOfTyres: false,
      tons: false,
      truckBodyType: false
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8f4ff" }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderWithOutBS title="Available Loads" />
        <View style={styles.container}>
          <CustomButton
            title="Post Load Needs"
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
        <LoadDetails navigation={navigation} filteredTrucks={filteredTrucks} />
      </View>

      {/* Filter Modal */}
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
              style={[styles.input, errorFields.companyName && styles.inputError]}
              placeholder="Company Name"
              value={modalValues.companyName}
              onChangeText={(text) => handleInputChange('companyName', text)}
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
              style={[styles.input, errorFields.material && styles.inputError]}
              placeholder="Material"
              value={modalValues.material}
              onChangeText={(text) => handleInputChange('material', text)}
            />
            <TextInput
              style={[styles.input, errorFields.noOfTyres && styles.inputError]}
              placeholder="Number of Tyres"
              value={modalValues.noOfTyres}
              onChangeText={(text) => handleInputChange('noOfTyres', text)}
            />
            <TextInput
              style={[styles.input, errorFields.tons && styles.inputError]}
              placeholder="Tons"
              value={modalValues.tons}
              onChangeText={(text) => handleInputChange('tons', text)}
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
  centeredContainer: {
    flex: 1,
    backgroundColor: "#e8f4ff",
    justifyContent: "center",
    alignItems: "center",
  },
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
  closeButton:{
    backgroundColor: "#8a1c33",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default AvailableLoads;
