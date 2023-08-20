import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapLocation} from '@fortawesome/free-solid-svg-icons';
import {GLOBAL_STYLES} from '../../../common';

const SetPrayerTimeLocation = () => {
  return (
    <TouchableOpacity style={GLOBAL_STYLES.settingsListItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faMapLocation} />
        <Text style={{marginLeft: 10}}>Set Prayer Time Location</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SetPrayerTimeLocation;

const styles = StyleSheet.create({});
