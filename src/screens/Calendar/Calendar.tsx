import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {GLOBAL_STYLES} from '../../common';
import TasksList from '../../common/TasksList';
import {useData} from '../../contexts/AppContext';

const getDaysBetweenDates = function (startDate: any, endDate: any) {
  let now = startDate.clone(),
    dates = [];
  let index = 0;

  while (now.isSameOrBefore(endDate)) {
    dates.push({
      id: index++,
      active: index === 1 ? true : false,
      date: moment(now),
    });
    now.add(1, 'days');
  }
  return dates;
};

export default function Calendar({navigation}: any) {
  const {tasks, setTasks} = useData();

  const [dateRange, setDateRange] = useState(
    getDaysBetweenDates(
      moment(new Date()),
      moment(new Date()).add(3, 'months'),
    ),
  );
  const toggleActiveHandle = (id: any) => {
    setDateRange(prev => {
      let newData = [...prev];
      newData = newData.map(elem => {
        if (elem.active) {
          return {
            ...elem,
            active: false,
          };
        } else {
          return elem;
        }
      });
      newData[id] = {
        ...newData[id],
        active: !newData[id].active,
      };
      return newData;
    });
  };

  const getActiveDay = () => {
    return dateRange.find(date => date.active);
  };

  return (
    <View style={GLOBAL_STYLES.screenWrapper}>
      <View>
        <FlatList
          data={dateRange}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item: {date, id, active}}: any) => {
            return active ? (
              <ImageBackground
                source={require('../../assets/images/date_selected.png')}
                style={{}}>
                <TouchableOpacity
                  key={id}
                  onPress={() => {
                    toggleActiveHandle(id);
                    navigation.setOptions({
                      title: moment(date).format('MMMM YYYY'),
                    });
                  }}>
                  <View
                    style={
                      active
                        ? {
                            width: 65,
                            height: 60,
                            padding: 6,
                            alignItems: 'center',
                            borderRadius: 5,
                          }
                        : {
                            width: 60,
                            height: 50,
                            backgroundColor: 'white',
                            padding: 6,
                            marginTop: 5,
                            marginBottom: 3,
                            alignItems: 'center',
                          }
                    }>
                    <Text
                      style={{
                        fontSize: active ? 22 : 16,
                        marginBottom: 3,
                        color: active ? 'white' : 'black',
                      }}>
                      {date.format('D')}
                    </Text>
                    <Text
                      style={{
                        fontSize: active ? 12 : 10,
                        color: active ? 'white' : 'black',
                      }}>
                      {date.format('dd')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  toggleActiveHandle(id);
                  navigation.setOptions({
                    title: moment(date).format('MMMM YYYY'),
                  });
                }}>
                <View
                  style={
                    active
                      ? {
                          width: 65,
                          height: 60,
                          padding: 6,
                          alignItems: 'center',
                          borderRadius: 5,
                        }
                      : {
                          width: 60,
                          height: 50,
                          backgroundColor: 'white',
                          padding: 6,
                          marginTop: 5,
                          marginBottom: 3,
                          alignItems: 'center',
                        }
                  }>
                  <Text
                    style={{
                      fontSize: active ? 22 : 16,
                      marginBottom: 3,
                      color: active ? 'white' : 'black',
                    }}>
                    {date.format('D')}
                  </Text>
                  <Text
                    style={{
                      fontSize: active ? 12 : 10,
                      color: active ? 'white' : 'black',
                    }}>
                    {date.format('dd')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <TasksList
        tasks={tasks.filter((task: any) =>
          moment(task.date).isSame(getActiveDay()?.date, 'day'),
        )}
        setTasks={setTasks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 10},
});
