import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

const Tag = ({tag, selected, onPress, size}: any) => {
  return selected ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#ccc',
        marginVertical: 7,
        marginHorizontal: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
        alignSelf: 'flex-start',
        position: 'relative',
      }}>
      <FontAwesomeIcon
        style={{marginRight: 5}}
        size={20}
        color="white"
        icon={tag.icon}
      />
      <Text style={{color: 'white'}} key={tag.id}>
        {tag.name}
      </Text>

      <View
        style={{
          position: 'absolute',
          top: 7,
          left: '60%',
        }}>
        <FontAwesomeIcon size={24} color="black" icon={faCheck} />
      </View>
    </TouchableOpacity>
  ) : size ? (
    <View
      style={{
        backgroundColor: tag.color,
        marginVertical: 7,
        marginRight: 10,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 25,
        alignSelf: 'flex-start',
        position: 'relative',
      }}>
      <FontAwesomeIcon
        style={{marginRight: 5}}
        size={15}
        color="white"
        icon={tag.icon}
      />
      <Text style={{color: 'white', fontSize: 10}} key={tag.id}>
        {tag.name}
      </Text>
    </View>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: tag.color,
        marginVertical: 7,
        marginHorizontal: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
        alignSelf: 'flex-start',
        position: 'relative',
      }}>
      <FontAwesomeIcon
        style={{marginRight: 5}}
        size={20}
        color="white"
        icon={tag.icon}
      />
      <Text style={{color: 'white'}} key={tag.id}>
        {tag.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({});
