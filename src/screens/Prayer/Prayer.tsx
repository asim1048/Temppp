import moment from 'moment';
import {Spinner, Switch, useToast} from 'native-base';
import React, {useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {GLOBAL_STYLES} from '../../common';
import {PRAYERS, VERSES} from '../../constants/data';
import {COLORS} from '../../constants/theme';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useData} from '../../contexts/AppContext';

export default function Prayer() {
  const toast = useToast();
  const [verses] = useState(VERSES);

  const {prayers, loading, setPrayers} = useData();

  async function onCreateTriggerNotification(hour: any, min: any) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'victory',
      vibration: true,
      vibrationPattern: [300, 500],
    });

    let date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(min));

    // Create a time-based trigger
    if (Number(hour) > date.getHours()) {
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
      };

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          title: '',
          body: `Today at ${moment(date).format('hh:mm a')}`,
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
    toast.show({
      description: `You'll be notified at ${hour}:${min}`,
    });
  }

  // const _storeData = async (value: any) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem('prayers', jsonValue);
  //   } catch (e: any) {
  //     // saving error
  //     alert('Error while saving reminder!');
  //   }
  // };

  // const getPrayerTimes = () => {
  //   setLoading(true);

  //   const getData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('prayers');
  //       const value = jsonValue != null ? JSON.parse(jsonValue) : null;
  //       if (value !== null) {
  //         // value previously stored
  //         setPrayers(value);
  //       } else {
  //         console.log('getting from api');

  //         fetch(
  //           `https://api.aladhan.com/v1/calendar?latitude=33.673354&longitude=73.027972&method=2&month=${currentMonth}&year=${currentYear}`,
  //         )
  //           .then(res => res.json())
  //           .then(prayers => {
  //             let timings = prayers.data[0].timings;
  //             if (timings) {
  //               let prayersTemp: any[] = [];
  //               const names = Object.keys(timings);
  //               names.forEach((item: any, index: number) => {
  //                 prayersTemp.push({
  //                   id: index,
  //                   name: item,
  //                   allow: false,
  //                   time: timings[item],
  //                 });
  //               });
  //               setPrayers(prayersTemp);
  //               _storeData(prayersTemp);
  //               console.log('prayersTemp', prayersTemp);
  //             }
  //             setLoading(false);
  //           })
  //           .catch(() => {
  //             setLoading(false);
  //             alert('No internet connection to sync prayer times.');
  //           });
  //       }
  //     } catch (e) {
  //       // error reading value
  //       alert('Cannot get data from storage!');
  //     }
  //   };
  //   getData();
  //   setLoading(false);
  // };

  let randomVerseIndex = 0;
  React.useEffect(() => {
    randomVerseIndex = Math.floor(Math.random() * (4 + 1));

    // get prayer times
    // getPrayerTimes();
  }, []);

  const renderHeader = () => {
    return (
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 8,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              paddingTop: 5,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Daily Prayer Reminder
          </Text>
        </View>
      </View>
    );
  };

  function renderVerse() {
    return (
      <View
        style={{
          marginTop: 10,
          borderRadius: 10,
          padding: 10,
          backgroundColor: '#E8E8E8',
          marginHorizontal: 8,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              marginLeft: 10,
              color: 'black',
              fontSize: 17,
            }}>
            {verses[randomVerseIndex].verse}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>({verses[randomVerseIndex].reference})</Text>
        </View>
      </View>
    );
  }
  const reminders = ({item, index}: any) => {
    return (
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20, flex: 1}}>{item.name}</Text>
          <Text style={{fontSize: 20, flex: 1}}>{item.time}</Text>
          <Switch
            style={{flex: 1}}
            value={item.allow}
            colorScheme="emerald"
            size="md"
            onToggle={() => {
              setPrayers((prev: any) => {
                const newData = [...prev];
                newData[index] = {
                  ...newData[index],
                  allow: !newData[index].allow,
                };

                // schedule notif
                if (newData[index].allow) {
                  // console.log(
                  //   'prayersTemp',
                  //   Number(newData[index]?.time?.split(' ')[0]?.split(':')[0]),
                  // );
                  // console.log(
                  //   'prayersTemp',
                  //   Number(newData[index]?.time?.split(' ')[0]?.split(':')[1]),
                  // );
                  onCreateTriggerNotification(
                    newData[index]?.time?.split(' ')[0]?.split(':')[0],
                    newData[index]?.time?.split(' ')[0]?.split(':')[1],
                  );
                }

                return newData;
              });
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={GLOBAL_STYLES.screenWrapper}>
      {renderHeader()}
      {renderVerse()}

      {loading ? (
        <Spinner style={{marginTop: 60}} size="lg" />
      ) : !prayers ? (
        <Text
          style={{
            color: COLORS.gray,
            fontStyle: 'italic',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Please connect to internet to sync prayers times
        </Text>
      ) : (
        <FlatList data={prayers} renderItem={reminders} />
      )}
    </View>
  );
}
