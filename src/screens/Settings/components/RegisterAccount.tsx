import {
  AppState,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope, faTrash, faUser} from '@fortawesome/free-solid-svg-icons';
import {GLOBAL_STYLES} from '../../../common';
import PushNotification from 'react-native-push-notification';

const RegisterAccount = ({navigation}: any) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    createChannels();
  }, []);
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'your-channel-id',
      channelName: 'Test Channel',
    });
  };
  function handleNotificationSch() {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId: 'your-channel-id',
      title: 'Time completed', // (optional)
      message: 'Here is the message', // (required)
      date: new Date(Date.now() + 5 * 1000), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured
    });
    console.log('pressed scdh');
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Address')}
      style={GLOBAL_STYLES.settingsListItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faUser} />
        <Text style={{marginLeft: 10}}>Select region for prayers time</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RegisterAccount;

const styles = StyleSheet.create({});
