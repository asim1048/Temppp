import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';

export default function Address({navigation}: any) {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const countryTemp = await AsyncStorage.getItem('country');
        const cityTemp = await AsyncStorage.getItem('city');
        if (countryTemp !== null && cityTemp !== null) {
          // value previously stored
          setCountry(countryTemp);
          setCity(city);
          console.log(country, city);
        }
      } catch (e) {
        // error reading value
        alert('Cannot get data from storage!');
      }
    };
    getData();
  }, []);

  const _storeData = async (country: string, city: string) => {
    try {
      await AsyncStorage.setItem('country', country);
      await AsyncStorage.setItem('city', city);
    } catch (e: any) {
      // saving error
      alert('Error while saving settings!');
    }
  };

  const renderCountry = ({item}: any) => {
    return (
      <View style={{height: 30}}>
        <TouchableOpacity
          onPress={() => {
            setCountry(item);
            console.log(country);
          }}>
          <Text style={{fontSize: 20, fontFamily: 'Lato'}}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderCities = ({item}: any) => {
    return (
      <View style={{height: 30}}>
        <TouchableOpacity
          onPress={() => {
            setCity(item);
            console.log(city);
          }}>
          <Text style={{fontSize: 20, fontFamily: 'Lato'}}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const fetchPrayerTime = () => {
    //Code to fetch prayer Time.........
    _storeData(country, city);
    navigation.goBack();
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 5,
        marginTop: 20,
      }}>
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'gray'}}>
          Choose Country and City for Prayer Reminder
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          {' '}
          Choose Country:
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'green',
          }}>
          {' '}
          {country}
        </Text>
      </View>
      <View
        style={{
          height: 200,
          borderWidth: 1,
          borderRadius: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <FlatList
          data={require('countries-cities').getCountries()}
          renderItem={renderCountry}
        />
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          {' '}
          Choose City:
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'green',
          }}>
          {' '}
          {city}
        </Text>
      </View>
      <View
        style={{
          height: 200,

          borderWidth: 1,
          borderRadius: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <FlatList
          data={require('countries-cities').getCities(country)}
          renderItem={renderCities}
        />
      </View>

      <TouchableOpacity
        style={{
          marginTop: 20,
          alignItems: 'center',
        }}
        onPress={fetchPrayerTime}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 35,
            borderWidth: 1,
            paddingHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 40,
            backgroundColor: 'blue',
            color: 'white',
          }}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
}
