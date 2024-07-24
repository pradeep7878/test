import React, { useState, useContext } from "react";
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

const LoadNeeds = () => {
  const { isLoading, setIsLoading } = useContext(LoadNeedsContext);

  const [spinner, setSpinner] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [material, setMaterial] = useState("");
  const [ton, setTon] = useState("");
  const [truckBodyType, setTruckBodyType] = useState("");
  const [numberOfTyres, setNumberOfTyres] = useState("");
  const [description, setDescription] = useState("");

  // State variables to track input field validity
  const [companyNameValid, setCompanyNameValid] = useState(true);
  const [contactNumberValid, setContactNumberValid] = useState(true);
  const [fromLocationValid, setFromLocationValid] = useState(true);
  const [toLocationValid, setToLocationValid] = useState(true);
  const [materialValid, setMaterialValid] = useState(true);
  const [tonValid, setTonValid] = useState(true);
  const [truckBodyTypeValid, setTruckBodyTypeValid] = useState(true);
  const [numberOfTyresValid, setNumberOfTyresValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);

  const handlePostAdd = async () => {
    setSpinner(true);
    // Check if any required field is empty
    if (
      companyName.trim() === "" ||
      contactNumber.trim() === "" ||
      fromLocation.trim() === "" ||
      toLocation.trim() === "" ||
      material.trim() === "" ||
      ton.trim() === "" ||
      truckBodyType.trim() === "" ||
      numberOfTyres.trim() === "" ||
      description.trim() === ""
    ) {
      Alert.alert("Please fill in all the fields.");
      setCompanyNameValid(companyName.trim() !== "");
      setContactNumberValid(contactNumber.trim() !== "");
      setFromLocationValid(fromLocation.trim() !== "");
      setToLocationValid(toLocation.trim() !== "");
      setMaterialValid(material.trim() !== "");
      setTonValid(ton.trim() !== "");
      setTruckBodyTypeValid(truckBodyType.trim() !== "");
      setNumberOfTyresValid(numberOfTyres.trim() !== "");
      setDescriptionValid(description.trim() !== "");
      setSpinner(false)
      return;
    }

    // Prepare data object to send in the API request
    const postData = {
      company_name: companyName,
      contact_no: contactNumber,
      from: fromLocation,
      to: toLocation,
      material: material,
      tone: ton,
      truck_body_type: truckBodyType,
      no_of_tyres: numberOfTyres,
      description: description,
      user_id: "3",
    };

    try {
      // Make API call using Axios instance (replace with your actual endpoint)
      const response = await axiosInstance.post("/load_details", postData);

      // Handle API response
      if (response.data.error_code === 0) {
        setIsLoading(!isLoading);
        Alert.alert("Post added successfully!");
        // Optionally, reset the form fields after successful submission
        setCompanyName("");
        setContactNumber("");
        setFromLocation("");
        setToLocation("");
        setMaterial("");
        setTon("");
        setTruckBodyType("");
        setNumberOfTyres("");
        setDescription("");
      } else {
        Alert.alert("Failed to add post. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      Alert.alert("Failed to add post. Please try again later.");
    } finally {
      setSpinner(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderWithOutBS title="Load Needs" />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.textInputContainer}>
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={[
                styles.textInput,
                !companyNameValid && { borderColor: "red" },
              ]}
              placeholder="Name of the Dealer"
              onChangeText={setCompanyName}
              value={companyName}
            />
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={[
                styles.textInput,
                !contactNumberValid && { borderColor: "red" },
              ]}
              placeholder="Type Your Number"
              onChangeText={setContactNumber}
              value={contactNumber}
            />
            <Text style={styles.label}>From</Text>
            <TextInput
              style={[
                styles.textInput,
                !fromLocationValid && { borderColor: "red" },
              ]}
              placeholder="Starting Location"
              onChangeText={setFromLocation}
              value={fromLocation}
            />
            <Text style={styles.label}>To</Text>
            <TextInput
              style={[
                styles.textInput,
                !toLocationValid && { borderColor: "red" },
              ]}
              placeholder="Destination Location"
              onChangeText={setToLocation}
              value={toLocation}
            />
            <Text style={styles.label}>Material</Text>
            <TextInput
              style={[
                styles.textInput,
                !materialValid && { borderColor: "red" },
              ]}
              placeholder="Type of Material"
              onChangeText={setMaterial}
              value={material}
            />
            <Text style={styles.label}>Ton</Text>
            <TextInput
              style={[styles.textInput, !tonValid && { borderColor: "red" }]}
              placeholder="Weight in Tons"
              onChangeText={setTon}
              value={ton}
            />
            <Text style={styles.label}>Truck Body Type</Text>
            <TextInput
              style={[
                styles.textInput,
                !truckBodyTypeValid && { borderColor: "red" },
              ]}
              placeholder="Type of Truck Body"
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
});

export default LoadNeeds;
