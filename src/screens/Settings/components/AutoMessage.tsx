import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {GLOBAL_STYLES} from '../../../common';

//Import Call Detector
import CallDetectorManager from 'react-native-call-detection';
// import SMS API
import SmsAndroid from 'react-native-get-sms-android';

const AutoMessage = () => {
  let callDetector = undefined;
  const [mobileNumber, setMobileNumber] = React.useState('03105315232');
  const [bodySMS, setBodySMS] = React.useState(
    'Esselamün Aleyküm!\nI am currently busy at the moment. I will call back you later.',
  );
  function startListenerTapped() {
    callDetector = new CallDetectorManager(
      (event: any, phoneNumber: any) => {
        console.log('Detector active');
        if (event === 'Incoming') {
          console.log('Call is incoming');
        } else if (event === 'Missed') {
          console.log('missed');
          console.log(phoneNumber);
          SmsAndroid.autoSend(
            phoneNumber,
            bodySMS,
            (fail: any) => {
              console.log('Failed with this error: ' + fail);
            },
            (success: any) => {
              console.log('SMS sent successfully');
            },
          );
        }
      },
      true, // if you want to read the phone number of the incoming call    [ANDROID], otherwise false
      (phoneNumber: any) => {
        console.log(phoneNumber);
      }, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default:
      console.error('Permission denied'), // callback if your permission got denied [IOS] [only if you want to read incoming number] default:
      // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    );
  }

  return (
    <TouchableOpacity
      onPress={() => startListenerTapped()}
      style={GLOBAL_STYLES.settingsListItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faEnvelope} />
        <Text style={{marginLeft: 10}}>
          {' '}
          Allow To Send Automatic SMS on Missed Calls
        </Text>
      </View>

      {/* <Switch /> */}
    </TouchableOpacity>
  );
};

export default AutoMessage;

const styles = StyleSheet.create({});
