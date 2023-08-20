import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useToast } from 'native-base';

export default function BirthDay({ navigation }) {
    const toast = useToast();

    const [friendName, setFriendName] = useState('');
  const [birthdayWish, setBirthdayWish] = useState('');

  const handleSendWish = () => {
    // You can customize this function to send the birthday wish
    // to your friend's number using SMS or any other method.
    // For this example, we'll just log the wish.
    console.log(`Wishing ${friendName} a very happy birthday! ${birthdayWish}`);
    toast.show({
        description: 'Added successfully.! Will be wished on given date.',
        duration: 1000,
    });
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Send Birthday Wishes</Text>
      <TextInput
        style={styles.input}
        placeholder="His/Her Name"
        onChangeText={(text) => setFriendName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="His/Her' Number"
        keyboardType='numeric'
      />
       <TextInput
        style={styles.input}
        placeholder="His/Her Birth Date"
      />
      <TextInput
        style={styles.input}
        placeholder="Lines"
        onChangeText={(text) => setBirthdayWish(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendWish}
      >
        <Text style={styles.buttonText}>Send Wish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

