import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tabs';
import Context from './src/contexts/AppContext';
import Tags from './src/screens/Tags/Tags';
import { createStackNavigator } from '@react-navigation/stack';
import { NewTask } from './src/screens/NewTask';
import { NativeBaseProvider } from 'native-base';
import { getPermissions } from './permissions';
import Address from './src/screens/Address';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SignUp from './src/screens/New/Signup';
import Login from './src/screens/New/Login';
import RemindersList from './src/screens/New/RemindersList';
import CreateImpReminder from './src/screens/New/CreateImpReminder';
import CreateNote from './src/screens/New/CreateNote';
import NotesList from './src/screens/New/NotesList';
import CreateWorkFlow from './src/screens/New/CreateWorkFlow';
import workflowList from './src/screens/New/workflowList';
import WorkflowDetailScreen from './src/screens/New/WorkflowDetailScreen';
import BirthDay from './src/screens/New/BirthDay';

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    getPermissions();
  }, []);

  const [fetchedStatus, setFetchedStatus] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const fetchUserStatus = async () => {
    const value = await AsyncStorage.getItem('isUserLoggedIn');
    if (value === 'true') {
      setUserLoggedIn(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFetchedStatus(true);
    }, 500);
  }, []);

  return (
    <Context>
      {fetchedStatus && (
        <NativeBaseProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="#006a78" />
            <Stack.Navigator initialRouteName={userLoggedIn ? 'Main' : 'Login'}>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Main"
                component={Tabs}
              />
              <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
              <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
              <Stack.Screen options={{ headerShown: false }} name="CreateImpReminder" component={CreateImpReminder} />
              <Stack.Screen options={{ headerShown: false }} name="RemindersList" component={RemindersList} />
              <Stack.Screen options={{ headerShown: false }} name="CreateNote" component={CreateNote} />
              <Stack.Screen options={{ headerShown: false }} name="NotesList" component={NotesList} />
              <Stack.Screen options={{ headerShown: false }} name="CreateWorkFlow" component={CreateWorkFlow} />
              <Stack.Screen options={{ headerShown: false }} name="workflowList" component={workflowList} />
              <Stack.Screen options={{ headerShown: false }} name="WorkflowDetailScreen" component={WorkflowDetailScreen} />
              <Stack.Screen options={{ headerShown: false }} name="BirthDay" component={BirthDay} />

              <Stack.Screen name="Tags" component={Tags} />
              <Stack.Screen name="Address" component={Address} />
            </Stack.Navigator>
          </NavigationContainer>
          <NewTask />
        </NativeBaseProvider>
      )}
    </Context>
  );
};const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff8c21',
    padding: 10,
    justifyContent: 'center',
    height: 60,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});

export default App;
