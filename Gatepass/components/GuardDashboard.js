import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const GuardDashboard = () => {
  const [students, setStudents] = useState([
    { id: 1, studentName: 'John Doe', destination: 'City Center', date: '2024-10-20', status: 'Approved', passType: 'Day Out', roomNo: '101', hostelName: 'Hostel A', phone: '1234567890', outTime: '', inTime: '', otpOut: '', otpIn: '' },
    { id: 2, studentName: 'Jane Smith', destination: 'Mall', date: '2024-10-10', status: 'Approved', passType: 'Night Out', roomNo: '102', hostelName: 'Hostel B', phone: '0987654321', outTime: '', inTime: '', otpOut: '', otpIn: '' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleOut = (id, otp) => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP for checking out.');
      return;
    }
    const currentTime = new Date().toLocaleTimeString();
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, outTime: currentTime, otpOut: otp } : student
      )
    );
    Alert.alert('Success', 'Student checked out successfully.');
  };

  const handleIn = (id, otp) => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP for checking in.');
      return;
    }
    const currentTime = new Date().toLocaleTimeString();
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, inTime: currentTime, otpIn: otp } : student
      )
    );
    Alert.alert('Success', 'Student checked in successfully.');
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const renderStudentItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.infoText}>Name: {item.studentName}</Text>
        <Text style={styles.infoText}>Destination: {item.destination}</Text>
        <Text style={styles.infoText}>Date: {item.date}</Text>
        <Text style={styles.infoText}>Room No: {item.roomNo}</Text>
        <Text style={styles.infoText}>Hostel: {item.hostelName}</Text>
        <Text style={styles.infoText}>Phone: {item.phone}</Text>
        <Text style={styles.infoText}>Pass Type: {item.passType}</Text>
        <Text style={styles.infoText}>Status: {item.status}</Text>
        <Text style={styles.infoText}>Out Time: {item.outTime || 'Not Yet'}</Text>
        <Text style={styles.infoText}>In Time: {item.inTime || 'Not Yet'}</Text>
        <View style={styles.actionContainer}>
          {!item.outTime && (
            <View style={styles.otpContainer}>
              <TextInput
                placeholder="Enter OTP for Out"
                style={styles.otpInput}
                onChangeText={(otp) => handleOut(item.id, otp)}
              />
              <TouchableOpacity
                style={styles.outButton}
                onPress={() => handleOut(item.id, item.otpOut)}
              >
                <Text style={styles.buttonText}>Out</Text>
              </TouchableOpacity>
            </View>
          )}
          {item.outTime && !item.inTime && (
            <View style={styles.otpContainer}>
              <TextInput
                placeholder="Enter OTP for In"
                style={styles.otpInput}
                onChangeText={(otp) => handleIn(item.id, otp)}
              />
              <TouchableOpacity
                style={styles.inButton}
                onPress={() => handleIn(item.id, item.otpIn)}
              >
                <Text style={styles.buttonText}>In</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={['rgba(0, 150, 136, 0.8)', 'rgba(0, 0, 0, 0.8)']} style={styles.container}>
      <Text style={styles.header}>Guard Dashboard</Text>
      <TextInput
        placeholder="Search by Student Name"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Picker
        selectedValue={filterStatus}
        style={styles.picker}
        onValueChange={(itemValue) => setFilterStatus(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Approved" value="Approved" />
      </Picker>
      <FlatList
        data={filteredStudents}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: '#fff' },
  picker: { height: 50, width: '100%', marginBottom: 20, color: '#fff' },
  card: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, backgroundColor: '#f5f5f5' },
  infoText: { fontSize: 16, marginBottom: 5 },
  actionContainer: { marginTop: 10 },
  otpContainer: { flexDirection: 'row', alignItems: 'center' },
  otpInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, flex: 1, marginRight: 10 },
  outButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  inButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default GuardDashboard;
