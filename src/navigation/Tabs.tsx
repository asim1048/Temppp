import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEllipsisVertical,
  faArrowsSplitUpAndLeft,
  faCalendar,
  faCog,
  faEllipsisV,
  faList,
  faMosque,
  faPlus,
  faPray,
  faSort,
  faSortAlphaAsc,
  faSortNumericAsc,
} from '@fortawesome/free-solid-svg-icons';
import NewTask from '../screens/NewTask/NewTask';
import { THEME } from '../constants';
import { COLORS, SIZES } from '../constants/theme';
import { Tasks } from '../screens/Tasks';
import { Calendar } from '../screens/Calendar';
import { Prayer } from '../screens/Prayer';
import { Settings } from '../screens/Settings';
import { useData } from '../contexts/AppContext';
import moment from 'moment';
import { Box, Menu, Pressable } from 'native-base';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 65,
        height: 65,
        borderRadius: 45,
        backgroundColor: THEME.COLORS.primary,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const MockupScreenForModal = () => <></>;

const Tabs = () => {
  const { setShowNewTaskModal } = useData();
  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 15,
          borderBottomColor: '#ccc',
          borderBottomWidth: 4,
          borderRightColor: '#ccc',
          borderRightWidth: 4,
          borderLeftColor: '#ccc',
          borderLeftWidth: 1,
          height: SIZES.tabBarHeight,
          paddingBottom: 20,
          ...styles.shadow,
        },
        headerStyle: {
          borderBottomColor: 'transparent',
          borderBottomWidth: 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 4,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: 24,
        },
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <FontAwesomeIcon
                color={focused ? THEME.COLORS.primary : '#748c94'}
                size={24}
                icon={faList}
              />
              {focused && (
                <Text
                  style={{
                    color: focused ? THEME.COLORS.primary : '#748c94',
                    fontSize: 9,
                    textTransform: 'uppercase',
                  }}
                >
                  TASKS
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar View"
        component={Calendar}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <FontAwesomeIcon
                color={focused ? THEME.COLORS.primary : '#748c94'}
                size={24}
                icon={faCalendar}
              />
              {focused && (
                <Text
                  style={{
                    color: focused ? THEME.COLORS.primary : '#748c94',
                    fontSize: 9,
                    textTransform: 'uppercase',
                  }}
                >
                  Calendar
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NewTask"
        component={MockupScreenForModal}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faPlus} size={35} color="#fff" />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            setShowNewTaskModal(true);
          },
        }}
      />
      <Tab.Screen
        name="Prayer"
        component={Prayer}
        options={{
          title: moment().format('MMMM YYYY'),
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <FontAwesomeIcon
                color={focused ? THEME.COLORS.primary : '#748c94'}
                size={24}
                icon={faMosque}
              />
              {focused && (
                <Text
                  style={{
                    color: focused ? THEME.COLORS.primary : '#748c94',
                    fontSize: 9,
                    textTransform: 'uppercase',
                  }}
                >
                  Prayer
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'More',
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}
            >
              <FontAwesomeIcon
                color={focused ? THEME.COLORS.primary : '#748c94'}
                icon={faEllipsisVertical}
                size={24}
              />
              {focused && (
                <Text
                  style={{
                    color: focused ? THEME.COLORS.primary : '#748c94',
                    fontSize: 9,
                    textTransform: 'uppercase',
                  }}
                >
                  More
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
