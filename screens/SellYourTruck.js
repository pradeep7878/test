import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants";
import HeaderWithOutBS from "../components/HeaderWithOutBS";

const SellYourTruck = () => {
  const [ownerName, setOwnerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [kmsDriven, setKmsDriven] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [ownerNameValid, setOwnerNameValid] = useState(true);
  const [contactNumberValid, setContactNumberValid] = useState(true);
  const [vehicleNumberValid, setVehicleNumberValid] = useState(true);
  const [kmsDrivenValid, setKmsDrivenValid] = useState(true);
  const [brandValid, setBrandValid] = useState(true);
  const [modelValid, setModelValid] = useState(true);
  const [locationValid, setLocationValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);

  const handlePostAdd = () => {
    if (
      ownerName.trim() === "" ||
      contactNumber.trim() === "" ||
      vehicleNumber.trim() === "" ||
      kmsDriven.trim() === "" ||
      brand.trim() === "" ||
      model.trim() === "" ||
      location.trim() === "" ||
      description.trim() === "" ||
      images.length === 0
    ) {
      Alert.alert("Please fill in all the fields and add at least one image.");
      setOwnerNameValid(ownerName.trim() !== "");
      setContactNumberValid(contactNumber.trim() !== "");
      setVehicleNumberValid(vehicleNumber.trim() !== "");
      setKmsDrivenValid(kmsDriven.trim() !== "");
      setBrandValid(brand.trim() !== "");
      setModelValid(model.trim() !== "");
      setLocationValid(location.trim() !== "");
      setDescriptionValid(description.trim() !== "");
      return;
    }
    Alert.alert("Post added successfully!");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, ...result.assets]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderWithOutBS title="Sell Your Truck" />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.textInputContainer}>
            <Text style={styles.label}>Owner Name</Text>
            <TextInput
              style={[
                styles.textInput,
                !ownerNameValid && { borderColor: "red" },
              ]}
              placeholder="Name of the Dealer"
              onChangeText={setOwnerName}
              value={ownerName}
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
            <Text style={styles.label}>Vehicle Number</Text>
            <TextInput
              style={[
                styles.textInput,
                !vehicleNumberValid && { borderColor: "red" },
              ]}
              placeholder="TN77AX6666"
              onChangeText={setVehicleNumber}
              value={vehicleNumber}
            />
            <Text style={styles.label}>Kms Driven</Text>
            <TextInput
              style={[
                styles.textInput,
                !kmsDrivenValid && { borderColor: "red" },
              ]}
              placeholder="2500000"
              onChangeText={setKmsDriven}
              value={kmsDriven}
            />
            <Text style={styles.label}>Brand</Text>
            <TextInput
              style={[styles.textInput, !brandValid && { borderColor: "red" }]}
              placeholder="Brand"
              onChangeText={setBrand}
              value={brand}
            />
            <Text style={styles.label}>Model</Text>
            <TextInput
              style={[styles.textInput, !modelValid && { borderColor: "red" }]}
              placeholder="Model"
              onChangeText={setModel}
              value={model}
            />
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={[
                styles.textInput,
                !locationValid && { borderColor: "red" },
              ]}
              placeholder="Location"
              onChangeText={setLocation}
              value={location}
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
            <Button title="Upload Images" onPress={pickImage} />
            <View style={styles.imageContainer}>
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={styles.image}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.postButton} onPress={handlePostAdd}>
            <Text style={styles.postButtonText}>Add Post</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
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
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default SellYourTruck;
