import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import Header from "../../components/Header";
import DropDownPicker from "react-native-dropdown-picker";
import axiosInstance from "../../services/axiosInstance";
import LoadDetails from "../AvailabaleLoads/LoadDetails";
import MarketPlace from "./MarketPlace";
import EditLoadModal from "./EditModal";

const Refer = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [allLoadData, setAllLoadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Load Posts", value: "all_load_details" },
    { label: "Driver Posts", value: "all_driver_details" },
    { label: "Truck Posts", value: "all_truck_details" },
    { label: "Market Posts", value: "all_buy_sell_details" },
  ]);


  const handleEdit = (item) => {    
    setEditItem(item);
    setEditModalVisible(true);
  };

  // Function to handle saving changes from the modal
  const handleSaveChanges = async (updatedDetails) => {
    try {
      // Make API call to update details
      // Example: await axiosInstance.put(`/updateLoad/${updatedDetails.id}`, updatedDetails);
      
      // Assuming successful update, update state and close modal
      setEditModalVisible(false);
      // You may need to fetch data again to update the UI after editing
      fetchData(selectedValue);
    } catch (error) {
      console.log('Error updating load details:', error);
    }
  };
  const fetchData = async (selectedValue) => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(`/${selectedValue}`);
      if (response.data.error_code === 0) {
        switch (selectedValue) {
          case "all_load_details":
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
              onButton1Press: () => handleEdit(item),               
              onButton2Press: () =>
                alert("Message Content will be displayed here..."),
            }));
            setAllLoadData(transformedData);
            break;
          case "all_driver_details":
            setAllLoadData([]);
            const transformedDriverData = response.data.data.map((item) => ({
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
              onButton1Press: () => handleEdit(item), 
              onButton2Press: () =>
                alert("Message Content will be displayed here..."),
            }));

            setAllLoadData(transformedDriverData);
            break;
          case "all_truck_details":
            setAllLoadData([]);
            const transformedAllTruckData = response.data.data.map((item) => ({
              title: item.company_name,
              fromLocation: item.from_location,
              toLocation: item.to_location,
              labels: [
                { icon: "table-view", text: item.truck_name },
                { icon: "directions-bus", text: item.vehicle_number },
                { icon: "attractions", text: item.no_of_tyres },
                { icon: "local-shipping", text: item.truck_body_type },
                { icon: "verified", text: "RC verified" },
              ],
              description: item.description,
              onButton1Press: () => handleEdit(item), 
              onButton2Press: () =>
                alert("Message Content will be displayed here..."),
            }));
            setAllLoadData(transformedAllTruckData);
            break;

          case "all_buy_sell_details":            
            setAllLoadData(response.data.data);
            break;
          default:
            break;
        }
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Header title="My Posts" />
        <View style={styles.container}>
          <DropDownPicker
            open={open}
            value={selectedValue}
            items={items}
            setOpen={setOpen}
            setValue={(value) => {
              setSelectedValue(value);
              fetchData(value());
            }}
            setItems={setItems}
            placeholder="Select Category"
            containerStyle={{ height: 40, marginBottom: 20 }}
            style={{ backgroundColor: "#fafafa" }}
          />
          {loading ? (
            <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : selectedValue === "all_buy_sell_details" ? (
            <MarketPlace allData={allLoadData} />
          ) : (
            <LoadDetails filteredTrucks={allLoadData} status="editAndDelete" handleEdit={handleEdit}/>
          )}
          
        </View>
        <EditLoadModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSave={handleSaveChanges}
          loadDetails={editItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Refer;
