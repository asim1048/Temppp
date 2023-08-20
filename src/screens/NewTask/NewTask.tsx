import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppState,
} from 'react-native';
import React from 'react';
import {useData} from '../../contexts/AppContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../constants/theme';
import NewTaskForm from './components/NewTaskForm';
import Modal from 'react-native-modal';
import moment from 'moment';
import {useToast} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {
  AndroidColor,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

const NewTask = ({navigation}: any) => {
  const toast = useToast();
  const {showNewTaskModal, setShowNewTaskModal, setTasks} = useData();
  const [task, setTask] = React.useState({
    title: '',
    date: new Date(),
    timeFrom: new Date(new Date().getTime() + 10 * 60000),
    timeTo: new Date(new Date().getTime() + 30 * 60000),
    enableDND: true,
    message: 'AOA! I am busy at the moment. I will call you back later!',
    allowAutomaticMessageOnMissedCall: true,
    description: '',
    hasReminder: true,
    reminders: [],
    tags: [],
    numbersToOverrideQuietMode: [],
    priority: 1,
  });

  // reset form
  React.useEffect(() => {
    setTask({
      title: '',
      date: new Date(),
      timeFrom: new Date(new Date().getTime() + 10 * 60000),
      timeTo: new Date(new Date().getTime() + 30 * 60000),
      enableDND: true,
      message: 'AOA! I am busy at the moment. I will call you back later!',
      allowAutomaticMessageOnMissedCall: true,
      description: '',
      hasReminder: true,
      reminders: [],
      tags: [],
      numbersToOverrideQuietMode: [],
      priority: 1,
    });
  }, [showNewTaskModal]);

  const handleModal = () => {
    setShowNewTaskModal(() => false);
  };

  const _storeData = async (value: any) => {
    try {
      let prevArray: any = await AsyncStorage.getItem('reminders');
      prevArray = prevArray != null ? JSON.parse(prevArray) : null;

      if (prevArray) {
        prevArray.push(value);
        const jsonValue = JSON.stringify([...prevArray]);
        await AsyncStorage.setItem('reminders', jsonValue);
      } else {
        let arr = [];
        arr.push(value);
        const jsonValue = JSON.stringify(arr);
        await AsyncStorage.setItem('reminders', jsonValue);
      }
    } catch (e: any) {
      // saving error
      alert('Error while saving reminder!');
    }
  };

  async function onCreateTriggerNotification(date: Date) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'victory',
      vibration: true,
      vibrationPattern: [300, 500],
    });

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: task.title,
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

  return (
    <Modal
      isVisible={showNewTaskModal}
      style={{
        marginBottom: 0,
        marginHorizontal: 0,
        marginTop: 0,
      }}
      backdropOpacity={0.5}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          paddingHorizontal: 18,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <TouchableOpacity
            onPress={handleModal}
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesomeIcon size={30} icon={faTimes} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (task.title === '') {
                return alert('Please enter title!');
              }
              if (
                moment(task.date).date() === new Date().getDate() &&
                moment(task.timeFrom).isBefore(new Date())
              ) {
                return alert(
                  'From Time value cannot be right now or before this moment!',
                );
              }

              if (moment(task.timeFrom).isSameOrAfter(task.timeTo)) {
                return alert('Please valid time range!');
              }
              if (task.tags.length === 0) {
                return alert('Please select at least one tag!');
              }
              if (
                task.allowAutomaticMessageOnMissedCall &&
                task.message === ''
              ) {
                return alert('Please enter message!');
              }

              setTasks((prev: any) => {
                let newData = [...prev];
                console.log('prev', prev);
                newData.push(task);
                console.log('newData', newData);
                return newData;
              });

              handleModal();

              _storeData(task);
              task.hasReminder && onCreateTriggerNotification(task.timeFrom);

              toast.show({
                description: 'Task added, hurray!',
              });
            }}
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 2,
            }}>
            <FontAwesomeIcon size={30} icon={faCheck} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 30,
              marginTop: 20,
            }}>
            New Task
          </Text>
          <NewTaskForm task={task} setTask={setTask} />
        </View>
      </View>
    </Modal>
  );
};

export default NewTask;

const styles = StyleSheet.create({});
