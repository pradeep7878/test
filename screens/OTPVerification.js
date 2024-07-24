import { View, Text, Image, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, images, SIZES } from '../constants/index.js';
import { StatusBar } from 'expo-status-bar';
import { OtpInput } from 'react-native-otp-entry';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import Button from '../components/Button.js';
import Container, { Toast } from 'toastify-react-native';



const OTPVerification = () => {

    const navigation = useNavigation()

    const [OTP, setOTP] = useState("")

    const verifyOTPFunction = async () => {
        const phoneNumber = await AsyncStorage.getItem("mobileNumber")
        const verifyParams = {
            phone_number: `${phoneNumber}`,
            otp: `${OTP}`,
        }
        try {
            console.log("verifyParams",verifyParams)
            const response = await axios.post("https://truck.truckmessage.com/validate_otp", verifyParams)
            console.log(response)

            if(response.data.error_code === 1){
                console.log(response)
                console.log(response.data)
                Toast.success(response.data.message)
                await AsyncStorage.setItem("user_id", response.data.data[0].user_id)
                navigation.navigate("Main")
            }else{
                Toast.error(response.data.message)
                return
            }
        } catch (err) {
            console.log(err)
        }
    }

    const resendClick = async () => {
        const phoneNumber = await AsyncStorage.getItem("mobileNumber");
        const resendParams = {
            phone_number: `${phoneNumber}`
        }
        try {
            console.log(resendParams)
            const response = await axios.post("https://truck.truckmessage.com/send_signup_otp", resendParams)
            if (response.data.error_code === 0) {
                console.log(response)
            } else {
                Toast.error(response.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView >
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
                <Container
                    position="footer"
                    duration={3000}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    Height="100%"
                    textStyle={{ backgroundColor: '', fontSize: 12 }}
                />
                <View style={{ flex: 1, backgroundColor: COLORS.white, padding: 16, alignItems: 'center' }}>
                    {/* <StatusBar hidden /> */}
                    <Image
                        source={images.apple}
                        resizeMode='contain'
                        style={{
                            width: SIZES.width * 0.6,
                            height: SIZES.width * 0.8,

                            marginBottom: 16,
                        }}
                    />
                    <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: '900' }}>Enter Verification Code</Text>
                    <Text style={{ ...FONTS.h6, marginBottom: 5, }}>We are automatically detecting SMS</Text>
                    <Text style={{ ...FONTS.h6, marginBottom: 10, }}>send to your phone number</Text>
                    <View style={{ marginVertical: 15, width: SIZES.width - 72 }}>
                        <OtpInput

                            numberOfDigits={6}
                            onTextChange={(text) => setOTP(text)}
                            focusColor={COLORS.primary}
                            focusStickBlinkingDuration={400}
                            disabled={false}
                            theme={{
                                pinCodeContainerStyle: {
                                    backgroundColor: COLORS.white,
                                    width: 50,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    borderRadius: 12,
                                    margin: 5,
                                    marginBottom: 10

                                }
                            }}

                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <Text>Don't receive the code ?</Text>
                        <TouchableOpacity>
                            <Text
                                style={{ ...FONTS.h6, color: COLORS.primary }}
                                onPress={resendClick}
                            >
                                {"  "}Resend code</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 300 }}>
                        <Button
                            color="brown"
                            title="Verify"
                            onPress={() => verifyOTPFunction()}
                        />
                    </View> */}

                    <View style={{ paddingBottom: 120 }}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={verifyOTPFunction}>
                            <Text style={styles.buttonText}>Verify</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: 'brown',
        color: '#fff',
        padding: 12,
        borderRadius: 5,
        textAlign: "center",
        width: "100%"
    },
    buttonContainer: {
        width: 200,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginHorizontal: 5,
        paddingVertical: 15,
        borderWidth: 1,
        alignItems: "center",
        marginTop: 30,

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
})

export default OTPVerification