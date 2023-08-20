import React, { useState ,useEffect} from 'react';
import {
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    Pressable

} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useToast } from 'native-base';
import Finger from '../../assets/images/Finger.png'
import TouchID from 'react-native-touch-id';


import {
    faEnvelope,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(false);
    const [userID, setUserID] = useState();


    const toast = useToast();

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const userIdFromStorage = await AsyncStorage.getItem('userID');
                setUserID(userIdFromStorage);
            } catch (error) {
                console.error('Error fetching userID from AsyncStorage:', error);
            }
        };

        fetchUserID();
    }, []);

    const handleFingerprintLogin = async () => {
        try {
            const isSupported = await TouchID.isSupported();

            if (!isSupported) {
                Alert.alert('Fingerprint Authentication', 'Fingerprint authentication is not available on this device.');
                return;
            }

            const isFingerprintMatch = await TouchID.authenticate('Sign in to continue.');

            if (isFingerprintMatch) {

                if (userID==null) {
                    toast.show({
                        description: 'Verified Successfully but You have login first with Email & Password',
                        duration: 3000,
                    });
                }
                else {
                    AsyncStorage.setItem('isUserLoggedIn', 'true');
                    toast.show({
                        description: 'Verified Successfully.',
                        duration: 1000,
                    });

                    navigation.replace('Main');
                }
            } else {
                setLoginStatus('Fingerprint authentication failed.');
            }
        } catch (error) {
            setLoginStatus('Fingerprint authentication failed: ' + error.message);
        }
    };


    const HanleLogin = async () => {
        if (
            password.length < 6 ||
            email.length < 4) {
            toast.show({
                description: 'Enter credentials First!',
                duration: 1000,
            });
            return;
        }
        await auth()
            .signInWithEmailAndPassword(email.trim(), password)

            .then(userCredential => {

                const user = userCredential.user;

                console.log(user);

                AsyncStorage.setItem('userID', user.uid);
                toast.show({
                    title: `Login Successfully`,
                    placement: "bottom",
                    duration: 3000,
                })
                AsyncStorage.setItem('isUserLoggedIn', "true");
                navigation.replace("Main");
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    toast.show({
                        title: `That email address is already in use!`,
                        placement: "bottom",
                        duration: 3000,
                    })
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    toast.show({
                        title: `That email address is invalid!`,
                        placement: "bottom",
                        duration: 3000,
                    })
                }

                console.error(error);
            });


        // toast.show({
        //     title: "User Login successfully!",
        //     placement: "bottom",
        //     duration: 3000,
        // })



    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#006a78",
        }}>
            <View style={{ flex: 1, backgroundColor: "#006a78", alignItems: 'center', justifyContent: "center" }}>


                {/*Login */}
                <View style={{
                    flex: 0.64,
                    borderRadius: 20,
                    backgroundColor: '#006a78',
                    opacity: 0.8,
                    marginHorizontal: 15,
                    alignItems: 'center',
                    justifyContent: "center",
                }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{
                            marginTop: 10,

                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 15,
                                color: 'white',
                            }}>LOG IN TO YOUR ACCOUNT</Text>
                        </View>

                        {/*Email */}
                        <View style={{
                            marginTop: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottomWidth: 1,
                            marginHorizontal: responsiveWidth(5),

                        }}>
                            <TextInput style={{
                                width: responsiveWidth(90),
                                fontSize: 18,
                                color: "white",
                                borderColor: 'gray'
                            }}
                                placeholder="Email Address"
                                placeholderTextColor={"white"}
                                onChangeText={(value) => setEmail(value)}
                            />
                            <FontAwesomeIcon icon={faEnvelope} size={20} color="white" />
                        </View>

                        {/*Password */}
                        <View style={{
                            marginTop: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottomWidth: 1,
                            marginHorizontal: responsiveWidth(5),


                        }}>
                            <TextInput style={{
                                width: responsiveWidth(90),
                                fontSize: 18,
                                color: "white",
                                borderColor: 'gray'
                            }}
                                secureTextEntry={!hidePassword}
                                placeholder="Password"
                                placeholderTextColor={"white"}
                                onChangeText={(value) => setPassword(value)}
                            />
                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                <FontAwesomeIcon icon={hidePassword ? faEye : faEyeSlash} size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/*ForgetPassword */}
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 25,
                        }}>
                            <View></View>
                            <TouchableOpacity >
                                <Text style={{
                                    fontSize: 16,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>Forget Password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/*Login */}
                        <View style={{
                            marginTop: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 25,
                        }}>
                            <TouchableOpacity style={{
                                width: responsiveWidth(90),
                                height: 45,
                                backgroundColor: '#0E1B41',
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => HanleLogin()}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontSize: 19,
                                    fontWeight: 'bold'
                                }}>LOG IN</Text>
                            </TouchableOpacity>
                        </View>

                        {/*Connect Using */}
                        <View style={{
                            marginTop: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>

                            {/* <Text style={{
                  color: '#4ba2ca',
                  fontSize: 19,
                }}>Or Connect Using</Text> */}
                        </View>



                        <Pressable style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: responsiveHeight(2)
                        }}
                            onPress={() => handleFingerprintLogin()}
                        >
                            <Image style={{ height: responsiveHeight(7), width: responsiveWidth(15) }}
                                source={Finger}
                            />
                        </Pressable><View style={{
                            alignItems: "center",
                            justifyContent: 'center',
                            marginTop: responsiveHeight(2)
                        }}>


                            <Text style={{
                                color: "#FFFFFF",
                                fontSize: responsiveFontSize(1.9),
                                width: responsiveWidth(90),
                                textAlign: 'center',
                                fontFamily: 'Poppins'
                            }}>Fingerprint Verification</Text>
                        </View>

                        {/*SignUp  */}
                        <View style={{
                            marginTop: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 14,
                            }}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Text style={{
                                    color: '#000a75',
                                    fontSize: 19,
                                    fontWeight: 'bold',
                                    marginLeft: 5,
                                }}>SignUp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{
                flex: 0.01,
            }}>
            </View>
            {/* </View> */}
        </View>
    );
};