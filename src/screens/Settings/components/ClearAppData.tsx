import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope, faTrash} from '@fortawesome/free-solid-svg-icons';
import {GLOBAL_STYLES} from '../../../common';
import notifee, {
  AndroidColor,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import moment from 'moment';

async function onDisplayNotification() {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'victory',
    vibration: true,
    vibrationPattern: [300, 500],
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
console.log('timeasd:', moment(new Date()).format('hh'));
async function onCreateTriggerNotification() {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'victory',
    vibration: true,
    vibrationPattern: [300, 500],
  });

  const date = new Date(Date.now());
  date.setHours(13);
  date.setMinutes(37);

  // Create a time-based trigger
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    alarmManager: true,
  };

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      title: 'Meeting with Jane',
      body: 'Today at 11:20am',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
}

const ClearAppData = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={GLOBAL_STYLES.settingsListItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faTrash} />
        <Text style={{marginLeft: 10}}>Clear App Data</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClearAppData;

const styles = StyleSheet.create({});
