import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function WardenSignup({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    employeeId: '',
    hostel: '',
    phoneNo: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Validate that passwords match
    if (form.password === form.confirmPassword) {
      const response= axios.post("http://192.168.1.67:3001/wardenregister",form);
      console.log("response",response);
      alert("Registration Successful");
      navigation.navigate('WardenLogin');
      // Navigate to another screen if needed
      // navigation.navigate('NextScreen'); // Uncomment and replace 'NextScreen' with the desired screen name
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Warden Signup</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        placeholder="Employee ID"
        style={styles.input}
        onChangeText={(text) => handleInputChange('employeeId', text)}
      />
      <TextInput
        placeholder="Hostel"
        style={styles.input}
        onChangeText={(text) => handleInputChange('hostel', text)}
      />
      <TextInput
        placeholder="Phone No."
        style={styles.input}
        onChangeText={(text) => handleInputChange('phoneNo', text)}
      />
      <TextInput
        placeholder="Set Password"
        secureTextEntry
        style={styles.input}
        onChangeText={(text) => handleInputChange('password', text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('WardenLogin')}>
        <Text style={styles.loginButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 5
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    color: '#D32F2F',
  },
});
