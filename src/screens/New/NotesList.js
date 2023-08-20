import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
  StyleSheet

} from 'react-native';
import { Spinner, HStack } from 'native-base';

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
  faTrash,
  faSquarePen,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import firestore from '@react-native-firebase/firestore';

export default function RemindersList({ navigation }) {
  const [userID, setUserID] = useState('');
  const [reminders, setReminders] = useState([]);
  const [hasData, setHasData] = useState(false);




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

  useEffect(() => {
    if (userID) {
      const unsubscribe = firestore()
        .collection('notes')
        .doc(userID)
        .collection('list')
        .onSnapshot((snapshot) => {
          const remindersData = [];
          snapshot.forEach((doc) => {
            console.log(doc.data())
            remindersData.push(doc.data());
          });
          setReminders(remindersData);
        });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [userID]);
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

  useEffect(() => {
    const HasDataa = () => {
      if (reminders.length < 0) {
        setHasData(true);
      }
    }
    HasDataa();

  }, [reminders]);
  const [editingReminder, setEditingReminder] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDetail, setEditedDetail] = useState('');

  const editReminder = (item) => {
    setEditingReminder(item.id);
    setEditedTitle(item.title);
    setEditedDetail(item.detail);
  };

  const updateReminder = (id) => {
    const updatedReminders = reminders.map((item) =>
      item.id === id ? { ...item, title: editedTitle, detail: editedDetail } : item
    );
    setReminders(updatedReminders);
    setEditingReminder(null);
  };

  const renderReminderItem = ({ item }) => (
    <View style={styles.reminderItem}>
       <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View></View>
        <View style={{
          flexDirection: 'row',
        }}>
          <TouchableOpacity onPress={()=>editReminder(item)}>
          <FontAwesomeIcon icon={faSquarePen} />
          </TouchableOpacity>
          <View style={{
            marginLeft: 10,
          }}>
            <TouchableOpacity
              onPress={async () => {
                const updatedReminders = reminders.filter((itemm) => itemm.id !== item.id);
                setReminders(updatedReminders);
                // try {
                //   console.log(item)
                //   await firestore()
                //     .collection('notes')
                //     .doc(userID)
                //     .collection('list')
                //     .doc(item.id)
                //     .delete();
                // } catch (error) {
                //   console.error('Error deleting reminder:', error);
                // }
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.detail}>{item.detail}</Text>
      {editingReminder === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
          />
          <TextInput
            style={styles.input}
            value={editedDetail}
            onChangeText={(text) => setEditedDetail(text)}
          />
          <TouchableOpacity onPress={() => updateReminder(item.id)}>
            <Text style={styles.updateButton}>Update</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View >
        </View>
      )}
    </View>
  );


  return (
    <View style={{
      flex: 1,
      backgroundColor: "#EDF3FF",
    }}>
      {/* LPG Ex-Plant Rates */}
      <View
        style={{
          marginHorizontal: responsiveWidth(5),
          height: responsiveHeight(5),
          backgroundColor: 'white',
          marginTop: responsiveHeight(1),
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
          elevation: 2,
        }}>
        <Text
          style={{
            fontSize: responsiveFontSize(1.9),
            fontWeight: '600',
            color: '#000000',
          }}>
          Notes
        </Text>
      </View>
      {reminders.length > 0 ? (
        <View style={{ marginTop: responsiveHeight(2) }}>
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            renderItem={renderReminderItem}

          />
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {hasData && (
            <View
              style={{
                marginTop: responsiveHeight(5),
              }}>
              <HStack space={2} justifyContent="center">
                <Spinner
                  color="#006a78"
                  accessibilityLabel="Loading posts"
                  size="lg"
                />
              </HStack>
            </View>
          )}
          <Text
            style={{
              marginTop: responsiveWidth(5),
              fontSize: responsiveFontSize(1.5),
              color: 'black',
              marginHorizontal: responsiveWidth(5),
              fontWeight: 'bold',
            }}>
            {!hasData && 'You Do NoT Any Note'}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: responsiveWidth(5),
  },
  reminderItem: {
    marginTop: responsiveHeight(0.5),
    marginHorizontal: responsiveWidth(5),
    backgroundColor: 'white',
    padding: responsiveWidth(1),
    borderRadius: responsiveWidth(2),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  detail: {
    fontSize: 16,
    color: '#666',
  },
  editContainer: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  updateButton: {
    color: 'green',
  },
});