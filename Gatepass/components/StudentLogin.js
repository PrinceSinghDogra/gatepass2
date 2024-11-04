import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function StudentLogin({ navigation }) { // Ensure navigation is received as a prop
  const [form, setForm] = useState({ uid: '', password: '' });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async  () => {
    // Assuming login is successful
    const response = await axios.post("http://192.168.1.9:3001/studentlogin",form);
    console.log("Student login got response ", response.data.user._id);
    const userdata = response.data.user;
    console.log(userdata._id)
    if(response.data.status === "Valid"){
    alert("Login Successful");
    navigation.navigate('StudentDashboard',{userdata:userdata});}
    else{
      console.log("It is not valid");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Student Login</Text>
      <TextInput
        placeholder="UID"
        style={styles.input}
        onChangeText={(text) => handleInputChange('uid', text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={(text) => handleInputChange('password', text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
