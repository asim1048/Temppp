import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function App() {
  const [workflowList, setWorkflowList] = useState([
    {
      title: 'Paiyan Treat do',
      tasks: [
        { id: '1', title: 'Shadi ki 1', time: '30', completed: false },
        { id: '2', title: 'Ghar leny ki', time: '45', completed: false },
      ],
    },
    {
      title: 'Project B',
      tasks: [
        { id: '3', title: 'Task 1', time: '60', completed: false },
        { id: '4', title: 'Task 2', time: '20', completed: false },
      ],
    },
  ]);

  const handleTaskToggle = (workflowIndex, taskId) => {
    const updatedWorkflows = [...workflowList];
    const taskIndex = updatedWorkflows[workflowIndex].tasks.findIndex(task => task.id === taskId);
    updatedWorkflows[workflowIndex].tasks[taskIndex].completed = !updatedWorkflows[workflowIndex].tasks[taskIndex].completed;
    setWorkflowList(updatedWorkflows);
  };

  const handleCompleteAll = (workflowIndex) => {
    const updatedWorkflows = [...workflowList];
    updatedWorkflows[workflowIndex].tasks.forEach(task => (task.completed = true));
    setWorkflowList(updatedWorkflows);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleTaskToggle(index, item.id)}
      style={[
        styles.taskItem,
        item.completed ? styles.completedTask : null,
      ]}
    >
      <Checkbox
        status={item.completed ? 'checked' : 'unchecked'}
        onPress={() => handleTaskToggle(index, item.id)}
        color={item.completed ? '#ffffff' : '#000000'}
      />
      <Text style={styles.taskTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workflowList}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          <View>
            <Text style={styles.workflowTitle}>{item.title}</Text>
            <Button
              title="Complete All"
              onPress={() => handleCompleteAll(index)}
            />
            <FlatList
              data={item.tasks}
              keyExtractor={(task) => task.id}
              renderItem={renderItem}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  workflowTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskTitle: {
    marginLeft: 8,
  },
});
