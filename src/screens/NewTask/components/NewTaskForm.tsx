import {
  KeyboardAvoidingView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import InputLabel from './InputLabel';
import {Input, ScrollView, Slider} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AddTags from './AddTags';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBan,
  faBell,
  faCalendar,
  faClock,
  faEnvelope,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../../constants/theme';
import {GLOBAL_STYLES} from '../../../common';

const NewTaskForm = ({task, setTask}: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
  const [prioty,setPriority]=useState('1')
  const [isTimeToPickerVisible, setTimeToPickerVisibility] =
    React.useState(false);

  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputLabel label="Title" error={false} errorMessage="Invalid title">
          <Input
            InputRightElement={
              <FontAwesomeIcon
                icon={faTasks}
                color={COLORS.gray}
                style={{marginRight: 10}}
              />
            }
            variant="filled"
            value={task.title}
            onChangeText={(value: any) => {
              setTask((prev: any) => {
                return {
                  ...prev,
                  title: value,
                };
              });
            }}
            placeholder="Enter title"
          />
        </InputLabel>
        <InputLabel label="Date" error={false} errorMessage="Invalid date">
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Input
              variant="filled"
              InputRightElement={
                <FontAwesomeIcon
                  icon={faCalendar}
                  color={COLORS.gray}
                  style={{marginRight: 10}}
                />
              }
              value={moment(task.date).format('DD-MMM-YYYY')}
              isReadOnly
              placeholder="Select date"
            />
          </TouchableOpacity>
        </InputLabel>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <InputLabel
            style={{flex: 1, marginRight: 5}}
            label="From Time"
            error={false}
            errorMessage="Invalid value">
            <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
              <Input
                variant="filled"
                InputRightElement={
                  <FontAwesomeIcon
                    icon={faClock}
                    color={COLORS.gray}
                    style={{marginRight: 10}}
                  />
                }
                value={moment(task.timeFrom).format('hh:mm A')}
                isReadOnly
                placeholder="Select time"
              />
            </TouchableOpacity>
          </InputLabel>
          <InputLabel
            style={{flex: 1}}
            label="To Time"
            error={moment(task.timeFrom).isSameOrAfter(task.timeTo)}
            errorMessage="Select after From Time">
            <TouchableOpacity onPress={() => setTimeToPickerVisibility(true)}>
              <Input
                variant="filled"
                InputRightElement={
                  <FontAwesomeIcon
                    icon={faClock}
                    color={COLORS.gray}
                    style={{marginRight: 10}}
                  />
                }
                value={moment(task.timeTo).format('hh:mm A')}
                isReadOnly
                placeholder="Select time"
              />
            </TouchableOpacity>
          </InputLabel>
        </View>
        <InputLabel
          label="Description (Optional)"
          error={false}
          errorMessage="Invalid value">
          <Input
            variant="filled"
            multiline
            numberOfLines={5}
            value={task.description}
            onChangeText={(value: any) => {
              setTask((prev: any) => {
                return {
                  ...prev,
                  description: value,
                };
              });
            }}
            placeholder="Enter description"
            textAlignVertical="top"
          />
        </InputLabel>
        <InputLabel
          style={{marginBottom: 15}}
          label="Priority"
          error={false}
          errorMessage="Invalid value">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          backgroundColor: 'rgba(0, 128, 0, 0.3)',
          opacity:prioty=='1'?1:0.5
        }}
        onPress={()=>{setPriority('1')}}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Low</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          paddingVertical: 10,
          marginLeft:10,
          backgroundColor: 'rgba(255, 165, 0, 0.3)',
          opacity:prioty=='2'?1:0.5
        }}
        
        onPress={()=>{setPriority('2')}}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          paddingVertical: 10,
          marginLeft:10,
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          opacity:prioty=='3'?1:0.5
        }}
        
        onPress={()=>{setPriority('3')}}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>High</Text>
      </TouchableOpacity>
    </View>
        </InputLabel>
        <InputLabel
          style={{marginBottom: 15}}
          label="Add Tags (One Needed)"
          error={false}
          errorMessage="Invalid value">
          <AddTags
            setTagsInTask={(tags: any) => {
              setTask((prev: any) => {
                return {
                  ...prev,
                  tags: tags,
                };
              });
            }}
          />
        </InputLabel>
        <View style={GLOBAL_STYLES.settingsListItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon icon={faBan} />
            <Text style={{marginLeft: 10}}>Enable DND Mode</Text>
          </View>
          <Switch
            value={task.enableDND}
            onValueChange={() => {
              setTask((prev: any) => {
                return {
                  ...prev,
                  enableDND: !prev.enableDND,
                };
              });
            }}
          />
        </View>
        <View style={GLOBAL_STYLES.settingsListItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon icon={faBell} />
            <Text style={{marginLeft: 10}}>Enable Reminders</Text>
          </View>
          <Switch
            value={task.hasReminder}
            onValueChange={() => {
              setTask((prev: any) => {
                return {
                  ...prev,
                  hasReminder: !prev.hasReminder,
                };
              });
            }}
          />
        </View>
        <View style={GLOBAL_STYLES.settingsListItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon icon={faEnvelope} />
            <Text style={{marginLeft: 10}}>Allow Auto Msg On MissedCall</Text>
          </View>
          <Switch
            value={task.allowAutomaticMessageOnMissedCall}
            onValueChange={(value: any) => {
              setTask((prev: any) => {
                return {
                  ...prev,
                  allowAutomaticMessageOnMissedCall:
                    !prev.allowAutomaticMessageOnMissedCall,
                };
              });
            }}
          />
        </View>
        {task.allowAutomaticMessageOnMissedCall && (
          <InputLabel
            label="Message"
            error={false}
            errorMessage="Invalid value">
            <Input
              variant="filled"
              multiline
              numberOfLines={3}
              value={task.message}
              placeholder="Enter message"
              textAlignVertical="top"
              onChangeText={(value: any) => {
                setTask((prev: any) => {
                  return {
                    ...prev,
                    message: value,
                  };
                });
              }}
            />
          </InputLabel>
        )}
        <View style={{marginBottom: 80}} />
      </ScrollView>

      {/* Modals */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        minimumDate={new Date()}
        mode="date"
        onConfirm={(date: Date) => {
          setTask((prev: any) => {
            return {
              ...prev,
              date: date,
            };
          });
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(date: any) => {
          setTask((prev: any) => {
            return {
              ...prev,
              timeFrom: date,
            };
          });
          setTimePickerVisibility(false);
        }}
        onCancel={() => setTimePickerVisibility(false)}
      />
      <DateTimePickerModal
        isVisible={isTimeToPickerVisible}
        mode="time"
        onConfirm={(date: any) => {
          setTask((prev: any) => {
            return {
              ...prev,
              timeTo: date,
            };
          });
          setTimeToPickerVisibility(false);
        }}
        onCancel={() => setTimeToPickerVisibility(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default NewTaskForm;

const styles = StyleSheet.create({});
