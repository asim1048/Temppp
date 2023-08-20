import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope, faTags} from '@fortawesome/free-solid-svg-icons';
import {GLOBAL_STYLES} from '../../../common';

const ShowTags = ({navigation}: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Tags')}
      style={GLOBAL_STYLES.settingsListItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon icon={faTags} />
        <Text style={{marginLeft: 10}}>Tags</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ShowTags;

const styles = StyleSheet.create({});
