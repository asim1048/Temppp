import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FormControl, Input, WarningOutlineIcon} from 'native-base';

const InputLabel = ({label, children, error, errorMessage, style}: any) => {
  return (
    <View style={{...style}}>
      <FormControl isInvalid={error}>
        <FormControl.Label>
          <Text style={{marginTop: 15, fontWeight: '700', color: '#999'}}>
            {label}
          </Text>
        </FormControl.Label>
        {children}
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
};

export default InputLabel;

const styles = StyleSheet.create({});
