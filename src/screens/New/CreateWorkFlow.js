import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useToast } from 'native-base';

export default function App({ navigation }) {
  const toast = useToast();
  const [userID, setUserID] = useState('');

  const [workflowTitle, setWorkflowTitle] = useState('');
  const [taskCount, setTaskCount] = useState('1');
  const [tasks, setTasks] = useState([]);
  const [workflowList, setWorkflowList] = useState([]);
  
  useEffect(() => {
    const fetchUserStatus = async () => {
      const userId = await AsyncStorage.getItem('userID');
      setUserID(userId);
    }
    fetchUserStatus();
  }, []);

  const handleAddTask = () => {
    if (parseInt(taskCount) > 0) {
      setTasks([...tasks, { title: '', time: '', completed: false }]);
      setTaskCount((parseInt(taskCount) - 1).toString());
    }
  };

  const handleAddWorkflow = () => {
    if (workflowTitle !== '' && tasks.length > 0) {
      const newWorkflow = { title: workflowTitle, tasks: tasks };
      setWorkflowList([...workflowList, newWorkflow]);
  
      console.log(newWorkflow);
      firestore()
        .collection('workflow')
        .doc(userID)
        .collection('tasks')
        .add({
          userID: userID,
          id:userID+new Date(),
          workflowTitle: workflowTitle,
          workflowList: [newWorkflow], // Use newWorkflow here
        })
        .then(() => {
          toast.show({
            description: 'Added successfully!',
            duration: 1000,
          });
          navigation.navigate('Settings');
        });
    }
  };
  

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Workflow Title"
        value={workflowTitle}
        onChangeText={(text) => setWorkflowTitle(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Number of Tasks"
        value={taskCount}
        onChangeText={(text) => setTaskCount(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Task" onPress={handleAddTask} style={styles.button} />
      <ScrollView>
        {tasks.map((task, index) => (
          <View key={index}>
            <TextInput
              placeholder={`Task ${index + 1} Title`}
              value={task.title}
              onChangeText={(text) => handleTaskChange(index, 'title', text)}
              style={styles.input}
            />
            <TextInput
              placeholder={`Task ${index + 1} Time`}
              value={task.time}
              onChangeText={(text) => handleTaskChange(index, 'time', text)}
              style={styles.input}
            />
          </View>
        ))}
      </ScrollView>
      <Button title="Add Workflow" onPress={handleAddWorkflow} style={styles.button} />
      {/* {workflowList.map((workflow, index) => (
        <View key={index}>
          <Text style={styles.workflowTitle}>{workflow.title}</Text>
          {workflow.tasks.map((task, taskIndex) => (
            <Text key={taskIndex}>{`${task.title} - ${task.time} min`}</Text>
          ))}
        </View>
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  button: {
    marginBottom: 10,
  },
  workflowTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
