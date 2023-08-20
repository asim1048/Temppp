import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import moment from 'moment';
import {COLORS} from '../constants/theme';
import Tag from '../components/Tag';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TasksList = ({tasks, setTasks, showSideDate}: any) => {
  let row: Array<any> = [];
  let prevOpenedRow: any;
  const removeData = async (index: any) => {
    try {
      let prevArray: any = await AsyncStorage.getItem('reminders');
      prevArray = prevArray != null ? JSON.parse(prevArray) : null;
      if (prevArray) {
        prevArray.splice(index, 1);
        setTasks([...prevArray]);
        const jsonValue = JSON.stringify([...prevArray]);
        await AsyncStorage.setItem('reminders', jsonValue);
      }
    } catch (e) {
      // saving error
      alert('Error while deleting task state!');
    }
  };
  return (
    <FlatList
      data={tasks}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        const onClick = () => {
          // let a = tasks;
          // a.splice(index, 1);
          // setTasks([...a]);
          removeData(index);
        };

        const closeRow = (index: number) => {
          if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
          }
          prevOpenedRow = row[index];
        };

        const renderRightActions = (
          progress: any,
          dragX: any,
          onClick: any,
        ) => {
          return (
            <TouchableOpacity
              onPress={onClick}
              style={{
                margin: 0,
                alignContent: 'center',
                justifyContent: 'center',
                width: 70,
                backgroundColor: 'red',
                alignItems: 'center',
                marginVertical: 12,
              }}>
              <Text style={{fontWeight: '700', color: 'white'}}>DELETE</Text>
            </TouchableOpacity>
          );
        };

        return (
          <Swipeable
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, onClick)
            }
            overshootRight={false}
            onSwipeableOpen={() => closeRow(index)}
            ref={ref => (row[index] = ref)}>
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingLeft: 10,
              }}>
              {showSideDate && (
                <View>
                  <Text style={{fontSize: 35}}>
                    {moment(item.date).format('DD')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      color: COLORS.gray,
                    }}>
                    {moment(item.date).format('MMM')}
                  </Text>
                </View>
              )}

              <TouchableHighlight
                style={{
                  backgroundColor: '#fff',
                  height: 145,
                  marginLeft: showSideDate ? 20 : 0,
                  borderTopStartRadius: 10,
                  borderBottomStartRadius: 10,

                  borderBottomColor: item.tags[0].color + '33',
                  borderBottomWidth: 3,
                  borderLeftColor: item.tags[0].color + '33',
                  borderLeftWidth: 3,
                  borderRightColor: item.tags[0].color + '33',
                  borderRightWidth: 1,

                  padding: 10,
                  flex: 1,
                }}>
                <>
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    {item.title.length >= 25
                      ? item.title.slice(0, 25) + '...'
                      : item.title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    {item.tags.map((tag: any, index: number) => {
                      if (index < 3) {
                        return <Tag key={index} tag={tag} size={15} />;
                      } else if (index === 3) {
                        return (
                          <View
                            key={index}
                            style={{
                              borderWidth: 1,
                              borderColor: '#000',
                              borderRadius: 15,
                              paddingHorizontal: 5,
                              paddingVertical: 2,
                              alignSelf: 'center',
                            }}>
                            <Text style={{fontSize: 12, color: COLORS.gray}}>
                              +{item.tags.length - 3}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text style={{fontSize: 18, color: COLORS.gray}}>
                      {moment(item.date).format('dddd, DD MMMM YYYY')}
                    </Text>
                    <Text style={{color: COLORS.gray}}>
                      {moment(item.timeFrom).format('hh:mm A')} -{' '}
                      {moment(item.timeTo).format('hh:mm A')}
                    </Text>
                  </View>
                  <View style={{position: 'absolute', bottom: 10, right: 10}}>
                    {item.hasReminder ? (
                      <FontAwesomeIcon icon={faBell} />
                    ) : (
                      <Text
                        style={{
                          fontSize: 10,
                          color: COLORS.gray,
                          fontStyle: 'italic',
                        }}>
                        No reminder
                      </Text>
                    )}
                  </View>
                </>
              </TouchableHighlight>
            </View>
          </Swipeable>
        );
      }}
    />
  );
};

export default TasksList;

const styles = StyleSheet.create({});
