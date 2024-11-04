import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GuardLogin({navigation}) {
  const [credentials, setCredentials] = useState({ employeeId: '', password: '' });

  const handleInputChange = (name, value) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    // Handle login logic here
    const response =await axios.post("http://192.168.1.67:3001/guardlogin",credentials);
    console.log(" The response got from backend of guardlogin", response.data);
    if(response.data==="Valid"){
  
    navigation.navigate('GuardDashboard');}
    else{
      console.log("The data is invalid")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Guard Login</Text>
      <TextInput placeholder="Employee ID" style={styles.input} onChangeText={(text) => handleInputChange('employeeId', text)} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={(text) => handleInputChange('password', text)} />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 , textAlign:'center',},
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 10 },
  loginButton: { backgroundColor: '#D32F2F', padding: 15, borderRadius: 5 },
  loginButtonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
