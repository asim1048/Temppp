import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkflowDetailScreen({ route }) {
  const { workflowTitle, workflowList } = route.params;
  console.log(workflowList)
  const [updatedWorkflowList, setUpdatedWorkflowList] = useState(workflowList.tasks);

  const handleTaskPress = async (taskIndex) => {
    try {      
        const userId = await AsyncStorage.getItem('userID');

      const updatedList = [...updatedWorkflowList];
      updatedList[taskIndex].completed = !updatedList[taskIndex].completed;
      setUpdatedWorkflowList(updatedList);

      const workflowDocRef = firestore()
        .collection('workflow')
        .doc(userID)
        .collection('tasks')
        .where('workflowTitle', '==', workflowTitle);

      const querySnapshot = await workflowDocRef.get();

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await firestore()
          .collection('workflow')
          .doc(userId)
          .collection('tasks')
          .doc(docId)
          .update({
            workflowList: updatedList,
          });
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const renderTask = ({ item, index }) => (
    <TouchableOpacity
      style={styles.workflowItem}
      onPress={() => handleTaskPress(index)}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text>{`${item.time} min`}</Text>
      <Text>{item.completed ? 'Completed' : 'Not Completed'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workflowTitle} Workflow</Text>
      <FlatList
        data={updatedWorkflowList}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  workflowItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
