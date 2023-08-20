import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {Spinner, HStack} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {
  faTrash,
  faSquarePen,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
export default function WorkflowList() {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const [workflowTitles, setWorkflowTitles] = useState([]);
  console.log(workflowTitles);

  useEffect(() => {
    const fetchUserStatus = async () => {
      const userId = await AsyncStorage.getItem('userID');
      setUserID(userId);

      firestore()
        .collection('workflow')
        .doc(userId)
        .collection('tasks')
        .get()
        .then(querySnapshot => {
          const titles = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            titles.push(data.workflowTitle);
          });
          setWorkflowTitles(titles);
        })
        .catch(error => {
          console.error('Error fetching workflow data:', error);
        });
    };
    fetchUserStatus();
  }, []);

  const handleTitlePress = async (workflowTitle) => {
    try {
      const workflowListRef = firestore()
        .collection('workflow')
        .doc(userID)
        .collection('tasks')
        .where('workflowTitle', '==', workflowTitle);
  
      const querySnapshot = await workflowListRef.get();
      if (!querySnapshot.empty) {
        const workflowListData = querySnapshot.docs[0].data();
        console.log(workflowListData.workflowList[0])
        navigation.navigate('WorkflowDetailScreen', {
          workflowTitle: workflowTitle,
          workflowList: workflowListData.workflowList[0], // Fetch the complete workflowList array
        });
      }
    } catch (error) {
      console.error('Error fetching workflow list:', error);
    }
  };
  

  const renderWorkflowTitle = ({ item }) => (
    <TouchableOpacity
      style={styles.workflowItem}
      onPress={() => handleTitlePress(item)}>
       <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View></View>
        <View style={{
          flexDirection: 'row',
        }}>
          
          <View style={{
            marginLeft: 10,
          }}>
            <TouchableOpacity
              onPress={async () => {
                const updatedReminders = workflowTitles.filter((itemm) => itemm !== item);
                setWorkflowTitles(updatedReminders);
                
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <Text style={styles.workflowTitle}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {workflowTitles.length > 0 ? (
      <FlatList
        data={workflowTitles}
        renderItem={renderWorkflowTitle}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<Text style={styles.title}>Workflow</Text>}
      /> ) : (<View
        style={{
          marginTop:50,
        }}>
        <HStack space={2} justifyContent="center">
          <Spinner
            color="#006a78"
            accessibilityLabel="Loading posts"
            size="lg"
          />
        </HStack>
      </View>
      )}
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
  workflowItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth:1,
    borderColor:'gray',
    
  },
  workflowTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
