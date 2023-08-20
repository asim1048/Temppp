import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Title = ({title}: any) => {
  return (
    <View style={{margin: 10}}>
      <Text style={{fontWeight: '700', fontSize: 16, marginRight: 10}}>
        {title}
      </Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({});
