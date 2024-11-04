 import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function StudentSignup({ navigation }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    uid: '',
    email: '',
    fatherName: '',
    motherName: '',
    fphoneNo: '',
    mphoneNo: '',
    phoneNo: '',
    hostel: '',
    roomNo: '',
    wardenName: '',
    password: '',
    confirmPassword: '',
    gender: '' 
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (form.password === form.confirmPassword) {
      const response = axios.post('http://192.168.1.67:3001/studentregister',form);
      console.log("response",response)
      alert("Registration Successful");
      console.log(form);
      navigation.navigate('StudentLogin');
      // Here you can also navigate to another screen if needed
      // navigation.navigate('NextScreen'); // Uncomment and replace 'NextScreen' with the desired screen name
    } else {
      alert("Passwords do not match");
    }
  };
  const submit = ()=>{
    navigation.navigate('StudentLogin')
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Student Signup</Text>
      <TextInput
        placeholder="First Name"
        style={styles.input}
        onChangeText={(text) => handleInputChange('firstName', text)}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
        onChangeText={(text) => handleInputChange('lastName', text)}
      />
      <TextInput
        placeholder="UID"
        style={styles.input}
        onChangeText={(text) => handleInputChange('uid', text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        placeholder="Father Name"
        style={styles.input}
        onChangeText={(text) => handleInputChange('fatherName', text)}
      />
      <TextInput
        placeholder=" Father's Contact No."
        style={styles.input}
        onChangeText={(text) => handleInputChange('fphoneNo', text)}
      />

      <TextInput
        placeholder="Mother Name"
        style={styles.input}
        onChangeText={(text) => handleInputChange('motherName', text)}
      />

<TextInput
        placeholder="Mother's Phone No."
        style={styles.input}
        onChangeText={(text) => handleInputChange('mphoneNo', text)}
      />
      <TextInput
        placeholder="Personal Phone No."
        style={styles.input}
        onChangeText={(text) => handleInputChange('phoneNo', text)}
      />
      
      
      <Text style={styles.label}>Hostel Name</Text>
      <Picker
        selectedValue={form.hostel}
        style={styles.input}
        onValueChange={(itemValue) => handleInputChange('hostel', itemValue)}
      >
        <Picker.Item label="Select Hostel" value="" />
        <Picker.Item label="NCH-A" value="nch-a" />
        <Picker.Item label="NC-1" value="nc-1" />
        <Picker.Item label="NC-2" value="nc-2" />
        <Picker.Item label="NC-3" value="nc-3" />
        <Picker.Item label="NC-4" value="nc-4" />
        <Picker.Item label="SUKHNA" value="sukhna" />
        <Picker.Item label="Govind" value="govind" />
        <Picker.Item label="Zakir" value="zakir" />
        
      </Picker>

      <TextInput
        placeholder="Room No."
        style={styles.input}
        onChangeText={(text) => handleInputChange('roomNo', text)}
      />
      <TextInput
        placeholder="Warden Name"
        style={styles.input}
        onChangeText={(text) => handleInputChange('wardenName', text)}
      />
      
      {/* Gender Selection */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioOption}>
          <Text>Male</Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleInputChange('gender', 'male')}
          >
            {form.gender === 'male' && <View style={styles.selectedRadio} />}
          </TouchableOpacity>
        </View>
        <View style={styles.radioOption}>
          <Text>Female</Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleInputChange('gender', 'female')}
          >
            {form.gender === 'female' && <View style={styles.selectedRadio} />}
          </TouchableOpacity>
        </View>
      </View>
      
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
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('StudentLogin')}>
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
    marginBottom: 20,
    marginLeft: 30
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D32F2F',
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
