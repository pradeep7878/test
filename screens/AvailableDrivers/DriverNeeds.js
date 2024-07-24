import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import HeaderWithOutBS from "../../components/HeaderWithOutBS";
import axiosInstance from "../../services/axiosInstance";
import { LoadNeedsContext } from "../../hooks/LoadNeedsContext";

const DriverNeeds = () => {

  const { isLoading, setIsLoading } = useContext(LoadNeedsContext);


  const [spinner, setSpinner] = useState(false);
  

  const [driverName, setDriverName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [truckName, setTruckName] = useState("");
  const [truckBodyType, setTruckBodyType] = useState("");
  const [numberOfTyres, setNumberOfTyres] = useState("");
  const [description, setDescription] = useState("");

  // State variables to track input field validity
  const [driverNameValid, setDriverNameValid] = useState(true);
  const [vehicleNumberValid, setVehicleNumberValid] = useState(true);
  const [companyNameValid, setCompanyNameValid] = useState(true);
  const [contactNumberValid, setContactNumberValid] = useState(true);
  const [fromLocationValid, setFromLocationValid] = useState(true);
  const [toLocationValid, setToLocationValid] = useState(true);
  const [truckNameValid, setTruckNameValid] = useState(true);
  const [truckBodyTypeValid, setTruckBodyTypeValid] = useState(true);
  const [numberOfTyresValid, setNumberOfTyresValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);

  const handlePostAdd = async () => {
    setSpinner(true); // Show spinner while making API call

    if (
      driverName.trim() === "" ||
      vehicleNumber.trim() === "" ||
      companyName.trim() === "" ||
      contactNumber.trim() === "" ||
      fromLocation.trim() === "" ||
      toLocation.trim() === "" ||
      truckName.trim() === "" ||
      truckBodyType.trim() === "" ||
      numberOfTyres.trim() === "" ||
      description.trim() === ""
    ) {
      Alert.alert("Please fill in all the fields.");
      setDriverNameValid(driverName.trim() !== "");
      setVehicleNumberValid(vehicleNumber.trim() !== "");
      setCompanyNameValid(companyName.trim() !== "");
      setContactNumberValid(contactNumber.trim() !== "");
      setFromLocationValid(fromLocation.trim() !== "");
      setToLocationValid(toLocation.trim() !== "");
      setTruckNameValid(truckName.trim() !== "");
      setTruckBodyTypeValid(truckBodyType.trim() !== "");
      setNumberOfTyresValid(numberOfTyres.trim() !== "");
      setDescriptionValid(description.trim() !== "");
      setSpinner(false); // Hide spinner
      return;
    }

    const postData = {
      driver_name: driverName,
      vehicle_number: vehicleNumber,
      company_name: companyName,
      contact_no: contactNumber,
      from: fromLocation,
      to: toLocation,
      truck_name: truckName,
      truck_body_type: truckBodyType,
      no_of_tyres: numberOfTyres,
      description: description,
      user_id:'3'
    };

    try {
      const response = await axiosInstance.post("/driver_entry", postData);
      if (response.data.error_code === 0) {
        setSpinner(false);
        setIsLoading(!isLoading);
        console.log("API Response:", response.data);
        // Reset input fields
        setDriverName("");
        setVehicleNumber("");
        setCompanyName("");
        setContactNumber("");
        setFromLocation("");
        setToLocation("");
        setTruckName("");
        setTruckBodyType("");
        setNumberOfTyres("");
        setDescription("");
        // Reset validation states
        setDriverNameValid(true);
        setVehicleNumberValid(true);
        setCompanyNameValid(true);
        setContactNumberValid(true);
        setFromLocationValid(true);
        setToLocationValid(true);
        setTruckNameValid(true);
        setTruckBodyTypeValid(true);
        setNumberOfTyresValid(true);
        setDescriptionValid(true);
        Alert.alert("Post added successfully!");
      } else {
        setSpinner(false);
        console.error("Error adding post:", response.data.error_message);
        Alert.alert("Failed to add post. Please try again later.");
      }
    } catch (error) {
      setSpinner(false);
      console.error("API Error:", error);
      Alert.alert("Failed to add post. Please try again later.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderWithOutBS title="Driver Needs" />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.textInputContainer}>
            <Text style={styles.label}>Driver Name</Text>
            <TextInput
              style={[
                styles.textInput,
                !driverNameValid && { borderColor: "red" },
              ]}
              placeholder="Driver Name"
              onChangeText={setDriverName}
              value={driverName}
            />
            <Text style={styles.label}>Vehicle Number</Text>
            <TextInput
              style={[
                styles.textInput,
                !vehicleNumberValid && { borderColor: "red" },
              ]}
              placeholder="Vehicle Number"
              onChangeText={setVehicleNumber}
              value={vehicleNumber}
            />
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={[
                styles.textInput,
                !companyNameValid && { borderColor: "red" },
              ]}
              placeholder="Company Name"
              onChangeText={setCompanyName}
              value={companyName}
            />
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={[
                styles.textInput,
                !contactNumberValid && { borderColor: "red" },
              ]}
              placeholder="Contact Number"
              onChangeText={setContactNumber}
              value={contactNumber}
            />
            <Text style={styles.label}>From</Text>
            <TextInput
              style={[
                styles.textInput,
                !fromLocationValid && { borderColor: "red" },
              ]}
              placeholder="From Location"
              onChangeText={setFromLocation}
              value={fromLocation}
            />
            <Text style={styles.label}>To</Text>
            <TextInput
              style={[
                styles.textInput,
                !toLocationValid && { borderColor: "red" },
              ]}
              placeholder="To Location"
              onChangeText={setToLocation}
              value={toLocation}
            />
            <Text style={styles.label}>Truck Name</Text>
            <TextInput
              style={[
                styles.textInput,
                !truckNameValid && { borderColor: "red" },
              ]}
              placeholder="Truck Name"
              onChangeText={setTruckName}
              value={truckName}
            />
            <Text style={styles.label}>Truck Body Type</Text>
            <TextInput
              style={[
                styles.textInput,
                !truckBodyTypeValid && { borderColor: "red" },
              ]}
              placeholder="Truck Body Type"
              onChangeText={setTruckBodyType}
              value={truckBodyType}
            />
            <Text style={styles.label}>No. of Tyres</Text>
            <TextInput
              style={[
                styles.textInput,
                !numberOfTyresValid && { borderColor: "red" },
              ]}
              placeholder="Number of Tyres"
              onChangeText={setNumberOfTyres}
              value={numberOfTyres}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[
                styles.textInput,
                !descriptionValid && { borderColor: "red" },
              ]}
              placeholder="Description"
              onChangeText={setDescription}
              value={description}
            />
          </View>

          

          {spinner ? (
            <TouchableOpacity style={styles.postButton}>
              <ActivityIndicator color={COLORS.white} size="small" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.postButton} onPress={handlePostAdd}>
              <Text style={styles.postButtonText}>Add Post</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postButtonText: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "700",
  },
  postButton: {
    backgroundColor: COLORS.brand,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 12,
    margin: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DriverNeeds;
