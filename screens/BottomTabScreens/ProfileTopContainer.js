import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';






const ProfileTopContainer = () => {


    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState(new Date());
    const [category, setCategory] = useState("Category");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [profileImage, setProfileImage] = useState("https://www.bootdey.com/img/Content/avatar/avatar6.png")

    const [show, setShow] = useState(false);

    // Dropdown data
    const categoryData = [
        { label: 'Item 1', category: '1' },
        { label: 'Item 2', category: '2' },
        { label: 'Item 3', category: '3' },
        { label: 'Item 4', category: '4' },
        { label: 'Item 5', category: '5' },
        { label: 'Item 6', category: '6' },
        { label: 'Item 7', category: '7' },
        { label: 'Item 8', category: '8' },
    ];

    useEffect(() => {
        const getUserProfileParams = {
            user_id : "2"
        }
        const getProfilePage = async () => {
            const response = await axios.post("https://truck.truckmessage.com/get_user_profile",getUserProfileParams)
            console.log(response)
            if(response.data.error_code === 0){
                setName(response.data.data[1].profile.first_name)
                setMobile(response.data.data[1].profile.phone_number)
                setCategory(response.data.data[1].profile.category)
                setCategory(response.data.data[1].profile.category)
                setCity(response.data.data[1].profile.operating_city)
                setState(response.data.data[1].profile.state)
            }else{
                console.log(response.data.message)
            }
            
        }
        (async () => getProfilePage())()
    },[])

    const handleEditPress = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const pickProfileImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
        const file = result.assets[0].uri;
        const formData = new FormData()
    }

    const handleSave = async () => {

        try {
            if (!profileImage) return;
            let localUri = profileImage;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            let formData = new FormData();
            formData.append('profile_image', { uri: localUri, name: filename, type });
            formData.append("user_id", 2)
            formData.append("first_name", name)
            formData.append("date_of_birth", dob)
            formData.append("category", category)
            formData.append("state", state)
            formData.append("phone_number", mobile)
            formData.append("operating_city", city)


            console.log("first_name", name)
            console.log("date_of_birth", dob)
            console.log("category", category)
            console.log("state", state)
            console.log("phone_number", mobile)
            console.log("operating_city", city)


            const res = await axios.post("https://truck.truckmessage.com/update_profile", formData, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            console.log("after save",res)
            setEditing(false);
            if (res.data.error_code === 0) {
                console.log("after submit",res)
                console.log(response)
            } else {
                console.log(response.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    };

    // Date picker
    const showDatePicker = () => {
        setShow(true)
    }
    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate !== undefined) {
            setDob(selectedDate);
            setInputs((prevState) => ({
                ...inputs, dob: selectedDate
            })
            )
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.editIcon}>
                <Feather onPress={handleEditPress} name="edit" size={20} color="black" />
            </Text>
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={{ uri: profileImage }} />
                <View style={styles.info}>

                    <Text style={styles.name}>{name}</Text>
                    <Text style={[styles.phone]}>
                        <Text><FontAwesome name="phone" size={15} color="black" /></Text>
                        <Text style={{ marginLeft: 50 }}>{`   +91${mobile}`}</Text>
                    </Text>
                    <Text style={[styles.dob]}>
                        <Text><Fontisto name="date" size={15} color="black" /></Text>
                        <Text style={{ marginLeft: 50 }}>{`  ${dob.toLocaleDateString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })}`}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Category</Text>
                    <Text style={styles.statValue}>{category}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>City</Text>
                    <Text style={styles.statValue}>{city}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>State</Text>
                    <Text style={styles.statValue}>{state}</Text>
                </View>
            </View>

            <Modal visible={editing} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>



                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>Edit Profile</Text>
                        <View>
                            <Image style={styles.modalAvatar}
                                source={{ uri: profileImage }}
                            />
                            <Feather style={styles.modalImageEditIcon}
                                name="edit"
                                size={20}
                                color="#000"
                                onPress={() => pickProfileImage()}
                            />
                        </View>

                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={mobile}
                            onChangeText={(text) => setMobile(text)}
                            placeholder="Mobile Number"
                        />
                        {/* <TextInput
                            style={styles.input}
                            value={dob}
                            onChangeText={(text) => setDob(text)}
                            placeholder="Date of Birth"
                        /> */}
                        <View >
                            <TextInput
                                placeholder={`Enter your date of birth`}
                                placeholderTextColor='grey'
                                style={styles.input}
                                onPress={showDatePicker}
                                value={dob !== "" ? dob.toLocaleDateString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' }) : ""}
                            >
                            </TextInput>


                            {show === true ?
                                <DateTimePicker
                                    value={dob}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                /> : null
                            }

                        </View>

                        {/* <TextInput
                            style={styles.input}
                            value={category}
                            onChangeText={(text) => setCategory(text)}
                            placeholder="Category"
                        /> */}
                        <Dropdown
                            style={styles.input}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            itemTextStyle={styles.itemTextStyle}
                            itemContainerStyle={styles.itemContainerStyle}
                            data={categoryData}
                            maxHeight={300}
                            labelField="label"
                            valueField="category"
                            // placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={category}
                            onChange={item => setCategory(item.category)}
                        />
                        <TextInput
                            style={styles.input}
                            value={city}
                            onChangeText={(text) => setCity(text)}
                            placeholder="City"
                        />
                        <TextInput
                            style={styles.input}
                            value={state}
                            onChangeText={(text) => setState(text)}
                            placeholder="State"
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = {
    container: {
        // backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        // marginTop: 10,

    },
    editIcon: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingVertical: 10,

    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 25,
    },
    modalAvatar: {
        width: 80,
        height: 80,
        borderRadius: 3,
        marginBottom: 20,
        marginHorizontal: 'auto'
    },
    modalImageEditIcon: {
        position: 'absolute',
        right: "35%",
        bottom: "20%",
    },
    info: {
        marginLeft: 20,
    },
    editButtonContainer: {
        backgroundColor: '#0066cc',
        borderRadius: 5,
        marginTop: 12,
        marginHorizontal: 5,
        paddingVertical: 6,
        borderWidth: 1,
        alignItems: "center",
    },
    editButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',

    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        maxWidth: '80%',
    },
    phone: {
        marginBottom: 10,
        marginHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dob: {
        // marginBottom : 10,
        marginHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        color: '#999',
        fontSize: 16,
        marginBottom: 5,
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
    statLabel: {
        color: '#999',
        fontSize: 14,
    },
    statValue: {
        fontSize: 16,
    },
    bio: {
        padding: 20,
        fontSize: 16,
        color: '#333',
    },
    headerContainer: {
        alignItems: "center",
    },
    coverPhoto: {
        width: "100%",
        height: 200,
    },
    profileContainer: {
        alignItems: "center",
        marginTop: -50,
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    bioContainer: {
        padding: 15,
    },
    bioText: {
        fontSize: 16,
    },
    statsContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
    },
    statContainer: {
        alignItems: "center",
        flex: 1,
    },
    statCount: {
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#0066cc",
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 20,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        color: 'grey'
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    itemTextStyle: {
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: "#0066cc",
        width: '25%'
    },
    cancelButton: {
        backgroundColor: "#999",
    },
};

export default ProfileTopContainer;
