import {
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNotesMedical, faBullhorn, faBell,faPenSquare,faRightFromBracket, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { GLOBAL_STYLES } from '../../common';
import { RINGER_MODE, useRingerMode, checkDndAccess, RingerModeType, requestDndAccess } from 'react-native-ringer-mode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterAccount from './components/RegisterAccount';
import Title from './components/Title';
const modeText: any = {
  [RINGER_MODE.silent]: 'Silent',
  [RINGER_MODE.normal]: 'Normal',
  [RINGER_MODE.vibrate]: 'Vibrate',
};

const Settings = ({ navigation }: any) => {
  const { mode, error, setMode }: any = useRingerMode();

  const changeMode = async (newMode: RingerModeType) => {
    if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
      const hasDndAccess = await checkDndAccess();
      if (hasDndAccess === false) {
        requestDndAccess();
        return;
      }
    }
    setMode(newMode);
  };

  return (
    <ScrollView style={{
      flex:1,
      paddingVertical: 20,
    marginHorizontal: 10,
    }}>
      <ScrollView>
        
        <Title title="Priority Reminders" />
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateImpReminder')}
          style={GLOBAL_STYLES.settingsListItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faBell} />
            <Text style={{ marginLeft: 10 }}>Create Reminder</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RemindersList')}
          style={GLOBAL_STYLES.settingsListItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faBullhorn} />
            <Text style={{ marginLeft: 10 }}>Reminders</Text>
          </View>
        </TouchableOpacity>

       


        <Title title="WorkFlow" />
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateWorkFlow')}
          style={GLOBAL_STYLES.settingsListItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faPenSquare} />
            <Text style={{ marginLeft: 10 }}>Create Workflow</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('workflowList')}
          style={GLOBAL_STYLES.settingsListItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faPenSquare} />
            <Text style={{ marginLeft: 10 }}>Workflows</Text>
          </View>
        </TouchableOpacity>

        <Title title="Wish Birthday" />
        <TouchableOpacity
          onPress={() => navigation.navigate('BirthDay')}
          style={GLOBAL_STYLES.settingsListItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faNotesMedical} />
            <Text style={{ marginLeft: 10 }}>Wish Your Contacst Now</Text>
          </View>
        </TouchableOpacity>
        
        <Title title="Notes" />
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateNote')}
          style={GLOBAL_STYLES.settingsListItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faNotesMedical} />
            <Text style={{ marginLeft: 10 }}>Create Note</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotesList')}
          style={GLOBAL_STYLES.settingsListItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faNoteSticky} />
            <Text style={{ marginLeft: 10 }}>Notes</Text>
          </View>
        </TouchableOpacity>
        

        <Title title="Logout" />
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Logout',
                  style: 'destructive',
                  onPress: async () => {
                    await AsyncStorage.setItem('isUserLoggedIn', 'false');
                    navigation.replace('Login');
                  },
                },
              ],
              { cancelable: true }
            );
          }}
          style={GLOBAL_STYLES.settingsListItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <Text style={{ marginLeft: 10 }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'gray',
          marginTop: 10,
        }}>
        KarnaHai © Version 1.0.0
      </Text>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
