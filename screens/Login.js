import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Button, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import Container, { Toast } from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';






const Login = () => {

    const inputRef = useRef("")

    const navigation = useNavigation()

    const [inputs, setInputs] = useState({
        mobileNumber: "",
        password: "",
    })

    const [currentPage, setCurrentPage] = useState('login')

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isChecked, setIsChecked] = useState(false)



    const handleChange = (name, value) => {
        setInputs((prevState) => ({
            ...prevState, [name]: value
        }))
    }


    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }




    const handleLogInClick = async (e) => {

        if (
            inputs.mobileNumber === "" ||
            inputs.password === ""
        ) {
            Toast.warn('Please fill all the details')
            return
        } else {

            // const regex = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"

            // if ((inputs.password).match(regex)) {
            //     alert('enter correct pw')
            // }
            const LogInParams = {
                phone_number: inputs.mobileNumber
            }

            try {

                await AsyncStorage.setItem("mobileNumber",inputs.mobileNumber)

                console.log(LogInParams)

                await axios.post("https://truck.truckmessage.com/send_signup_otp", LogInParams)
                    .then((response) => {
                        if (response.data.error_code === 0) {
                            console.log(response)
                            setInputs({
                                mobileNumber: "",
                                password: "",
                            })
                            Toast.success(response.data.message)
                            navigation.navigate('OTPVerification')
                        } else {
                            Toast.error(response.data.message)
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        }
    }



    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'android');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(!show);
    };




    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]}>
            <Container
                position="footer"
                duration={3000}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                height={60}
                textStyle={{ backgroundColor: '', fontSize: 12 }}
            />
            <View >
                {/* <StatusBar hidden /> */}
                {/* <View style={styles.pageHeadingContainer}>
                    <Text style={styles.pageHeading}>Login</Text>
                </View> */}

                {/* Login container */}
                <View style={styles.loginContainer}>
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar8.png' }}
                        />
                    </View>

                    <View style={styles.pageHeadingContainer}>
                        <Text style={[styles.pageHeading, { textAlign: 'center' }]}>Login</Text>
                    </View>

                    <View style={styles.inputField}>
                        <View>
                            <Text style={styles.label}>Phone Number</Text>
                        </View>
                        <View style={styles.mobileNumberInputBox}>
                            <TextInput
                                placeholder='+91'
                                placeholderTextColor='grey'
                                readOnly
                                style={styles.contryCodeInput}></TextInput>
                            <TextInput
                                autoFocus
                                placeholder='Enter your mobile number'
                                placeholderTextColor='grey'
                                inputMode='numeric'
                                // maxLength={10}
                                style={styles.mobileNumberInput}
                                value={inputs.mobileNumber}
                                onChangeText={(value) => handleChange('mobileNumber', value)}
                            >
                            </TextInput>
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={styles.label}>Password</Text>
                        </View>
                        <View style={[styles.passwordInputBox]}>
                            <TextInput
                                placeholder='Enter your password'
                                placeholderTextColor='grey'
                                style={[styles.input]}
                                secureTextEntry={showPassword ? false : true}
                                value={inputs.password}
                                onChangeText={(value) => handleChange('password', value)}
                            >
                            </TextInput>
                            <View style={{
                                position: "absolute",
                                right: 12,
                            }}>
                                <Pressable>
                                    {showPassword ?
                                        <Ionicons name="eye" size={30} color="black" onPress={() => handleShowPassword()} />
                                        :
                                        <Ionicons name="eye-off" size={30} color="black" onPress={() => handleShowPassword()} />
                                    }
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    {/* <View style={{ marginTop: 30, marginHorizontal: 'auto', width: 300, justifyContent: 'center' }}>
                        <Button title='Login' onPress={handleLogInClick} />
                        <CustomButton title="Register" onPress={handleLogInClick} />
                    </View> */}

                    <View>
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogInClick}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 22,
        width: "100%",
    },
    avatarContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    loginContainer: {
        borderColor: 'grey',
        borderWidth: 0.2,
        padding: 30,
        borderRadius: 5,
        width: "100%",
    },
    pageHeading: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 12,
        textAlign: 'center',
        marginBottom: 30,
    },
    signupContainer: {
        marginHorizontal: 20,
        marginTop: 30
    },
    label: {
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 10
    },
    inputField: {
        marginBottom: 15,
    },
    inputBox: {
        width: "100%",
        height: 48,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1
    },
    input: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    mobileNumberInputBox: {
        width: "100%",
        height: 48,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1,
        flexDirection: 'row'
    },
    contryCodeInput: {
        width: "15%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8,
        borderRightColor: 'grey',
        borderRightWidth: 1
    },
    mobileNumberInput: {
        width: "85%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12,
    },
    passwordInputBox: {
        width: "100%",
        height: 48,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1,
        justifyContent: 'center',
        // alignItems:'center'
    },
    buttonContainer: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginHorizontal: 5,
        paddingVertical: 15,
        borderWidth: 1,
        alignItems: "center",
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },





})

export default Login