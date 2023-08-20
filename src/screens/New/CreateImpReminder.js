import React, { useState, useEffect } from 'react';
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
    faCalendar,

} from '@fortawesome/free-solid-svg-icons';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useToast } from 'native-base';
import messaging from '@react-native-firebase/messaging';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';



import {
    faEnvelope,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import PushNotification from 'react-native-push-notification';

export default function Login({ navigation }) {
    const toast = useToast();

    const today = new Date();
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openDatePicker1, setOpenDatePicker1] = useState(false);
    const [selectedDate, setSelectedDate] = useState(
        today.toISOString().slice(0, 10),
    );

    const [currentTime, setCurrentTime] = useState(
        ''
    );

    const [deviceToken, setDeviceToken] = useState('');
    const [hasData, setHasData] = useState(false);

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [userID, setUserID] = useState('');
    console.log('UserID', userID);
    console.log('Token', deviceToken);

    useEffect(() => {
        // Request permission for push notifications
        PushNotification.requestPermissions();

        // Create a notification channel
        PushNotification.createChannel(
            {
                channelId: 'my-channel-id',
                channelName: 'My Notification Channel',
                channelDescription: 'A channel for my notifications',
                importance: 4,
                vibrate: true,
                soundName: 'default',
                playSound: true,
                enableLights: true,
                color: 'red',
            },
        );
    }, []);

    const sendNotification = () => {
        PushNotification.localNotification({
            channelId: 'my-channel-id',
            title: `We will remind you on ${selectedDate}`,
            // Specify the channelId to link the notification to the channel
            message: title,
            date: new Date(Date.now() + 1000), // Fire the notification 1 second from now
            repeatTime: 1, // Repeat the notification every 1 unit of configured repeatType
        });
    };



    useEffect(() => {
        const registerAppWithFCM = async () => {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            setDeviceToken(token);
            console.log(token);

        };
        const fetchUserStatus = async () => {
            const userId = await AsyncStorage.getItem('userID');
            setUserID(userId);


        }

        registerAppWithFCM();
        fetchUserStatus();
    }, []);

    const HanleLogin = async () => {
        if (title.length < 5) {
            toast.show({
                description: 'Please Enter Title',
                duration: 2000,
            });
        }
        else if (detail.length < 5) {
            toast.show({
                description: 'Please Enter Detail',
                duration: 2000,
            });
        }
        else {
            firestore()
                .collection('reminders')
                .doc(userID)
                .collection('priorityReminders')
                .add({
                    userID: userID,
                    deviceToken: deviceToken,
                    selectedDate: selectedDate,
                    title: title,
                    detail: detail,
                    time:currentTime,
                })
                .then(() => {
                    toast.show({
                        description: 'Added successfully!',
                        duration: 1000,
                    });
                    sendNotification();
                    navigation.navigate('Settings');
                });
        }

    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#EDF3FF",
        }}>
            {/* Create */}
            <View
                style={{
                    marginHorizontal: responsiveWidth(5),
                    height: responsiveHeight(5),
                    backgroundColor: 'white',
                    marginTop: responsiveHeight(3),
                    borderRadius: responsiveWidth(2.5),
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.0,
                    elevation: 1,
                }}>
                <Text
                    style={{
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '600',
                        color: '#000000',
                    }}>
                    Create Reminder
                </Text>
            </View>
            {/* Select Date */}
            <View
                style={{
                    marginTop: responsiveHeight(2),
                    marginHorizontal: responsiveWidth(5),
                }}>


                <View
                    style={{
                        marginTop: responsiveHeight(1),
                        height: responsiveHeight(5.5),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: responsiveWidth(3),
                        backgroundColor: 'white',
                        borderRadius: responsiveWidth(2),
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#595959',
                            fontFamily: 'Rubik',
                            marginLeft: responsiveWidth(2),
                        }}>
                        {selectedDate}
                    </Text>
                    <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                        <FontAwesomeIcon icon={faCalendar} size={20} color="#595959" />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={openDatePicker}
                        mode="date"
                        minimumDate={new Date()}
                        onConfirm={datee => {
                            setSelectedDate(datee.toISOString().slice(0, 10));
                            setOpenDatePicker(false);
                            //FetchTiming();
                        }}
                        onCancel={() => setOpenDatePicker(false)}
                    />
                </View>
            </View>
            {/* Title */}
            <View style={{
                marginHorizontal: responsiveWidth(5),
                marginTop: responsiveHeight(1),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TextInput
                    style={{
                        width: responsiveWidth(90),
                        height: responsiveHeight(5.5),
                        backgroundColor: 'white',
                        alignItems: 'center',
                        paddingHorizontal: responsiveWidth(2),
                        fontSize: responsiveFontSize(1.6),
                        fontWeight: 'bold',
                        color: '#212529',
                        borderRadius: responsiveWidth(2),
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                    }}
                    placeholder="Enter Time in 24hours Format"
                    maxLength={30}
                    onChangeText={val => setCurrentTime(val)}
                />
            </View>
            {/* Title */}
            <View style={{
                marginHorizontal: responsiveWidth(5),
                marginTop: responsiveHeight(1),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TextInput
                    style={{
                        width: responsiveWidth(90),
                        height: responsiveHeight(5.5),
                        backgroundColor: 'white',
                        alignItems: 'center',
                        paddingHorizontal: responsiveWidth(2),
                        fontSize: responsiveFontSize(1.6),
                        fontWeight: 'bold',
                        color: '#212529',
                        borderRadius: responsiveWidth(2),
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                    }}
                    placeholder="Enter Title"
                    maxLength={30}
                    onChangeText={val => setTitle(val)}
                />
            </View>
            {/* Detail */}
            <View style={{
                marginHorizontal: responsiveWidth(5),
                marginTop: responsiveHeight(1),
                flexDirection: 'row',
            }}>
                <TextInput
                    style={{
                        width: responsiveWidth(90),
                        padding: responsiveWidth(1),
                        textAlignVertical: 'top',
                        height: responsiveHeight(10.5),
                        backgroundColor: 'white',
                        paddingHorizontal: responsiveWidth(2),
                        fontSize: responsiveFontSize(1.6),
                        color: '#212529',
                        borderRadius: responsiveWidth(2),
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                    }}
                    multiline
                    placeholder="Enter Detail"
                    maxLength={200}
                    onChangeText={val => setDetail(val)}
                />
            </View>
            {/* Sub,mit */}
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity
                    style={{
                        marginTop: responsiveHeight(4),
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: responsiveWidth(90),
                        height: responsiveHeight(6),
                        backgroundColor: '#273458',
                        borderRadius: responsiveWidth(3),
                    }}
                    onPress={() => HanleLogin()}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins',
                            color: 'white',
                        }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};