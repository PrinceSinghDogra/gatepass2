import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import io from 'socket.io-client';
import { LinearGradient } from 'expo-linear-gradient';
import Notification from './Notification'; // Import the Notification component
import axios from 'axios';

const socket = io('http://your-server-ip-address');

export default function StudentDashboard({route}) {
  const {userdata} = route.params;
  
  const [passes, setPasses] = useState([
    // { id: 1, destination: 'City Center', date: '2024-10-20', status: 'Approved', reason: '' },
    // { id: 2, destination: 'Mall', date: '2024-10-10', status: 'Canceled', reason: 'Event Conflict' },
  ]);
  const [notifications, setNotifications] = useState([
    ''
  ]);
  
  const [form, setForm] = useState({
    destination: '',
    reason: '',
    date: '',
    time: '',
    outTime: '',
    returnTime: '',
    type: 'Day Out',
    file: null,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isOutTimePickerVisible, setOutTimePickerVisibility] = useState(false);
  const [isReturnTimePickerVisible, setReturnTimePickerVisibility] = useState(false);

  useEffect(() => {
    console.log("Data",userdata);
    socket.on('passStatusUpdate', (data) => {
      alert(`Your pass status is now: ${data.status}`);
      setPasses(prevPasses =>
        prevPasses.map(pass => (pass.id === data.passId ? { ...pass, status: data.status } : pass))
      );
      // setNotifications(prevNotifications => [...prevNotifications, `Your pass status is now: ${data.status}`]);
    });

    return () => socket.off('passStatusUpdate');
  }, []);
          
  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleFileUpload = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setForm({ ...form, file: result });
        alert('File Uploaded Successfully');
      } else {
        alert('File Upload Cancelled');
      }
    } catch (error) {
      alert('Error Uploading File');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setForm({ ...form, date: date.toISOString().split('T')[0] });
    hideDatePicker();
  };

  const showOutTimePicker = () => {
    setOutTimePickerVisibility(true);
  };

  const hideOutTimePicker = () => {
    setOutTimePickerVisibility(false);
  };

  const handleConfirmOutTime = (time) => {
    setForm({ ...form, outTime: time.toTimeString().split(' ')[0] });
    hideOutTimePicker();
  };

  const showReturnTimePicker = () => {
    setReturnTimePickerVisibility(true);
  };

  const hideReturnTimePicker = () => {
    setReturnTimePickerVisibility(false);
  };

  const handleConfirmReturnTime = (time) => {
    setForm({ ...form, returnTime: time.toTimeString().split(' ')[0] });
    hideReturnTimePicker();
  };

  const handleSubmit = async() => {
   
    // setForm({ destination: '', reason: '', date: '', time: '', outTime: '', returnTime: '', type: 'Day Out', file: null });
    console.log("This is handlesubmit1");
    try{await axios.post("http://192.168.1.9:3001/studentdashboard", {form:form,userdata:userdata});
      alert('Pass Request Submitted');
    }catch(e){
    console.log("error",e)
   }
  };

  const renderPassItem = ({ item }) => (
    <View style={styles.passCard}>
      <Text style={styles.passText}>Destination: {item.destination}</Text>
      <Text style={styles.passText}>Date: {item.date}</Text>
      <Text style={[styles.statusText, styles[`status${item.status}`]]}>{item.status}</Text>
      {item.reason && <Text style={styles.reasonText}>Reason: {item.reason}</Text>}
    </View>
  );

  const renderForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formHeader}>Apply for New Gate Pass</Text>
      <TextInput
        placeholder="Destination"
        style={styles.input}
        value={form.destination}
        onChangeText={(text) => handleInputChange('destination', text)}
      />
      <TextInput
        placeholder="Reason"
        style={styles.input}
        value={form.reason}
        onChangeText={(text) => handleInputChange('reason', text)}
      />

      {/* Outing Type Selection */}
      <View style={styles.outingTypeContainer}>
        <TouchableOpacity
          style={[styles.outingTypeButton, form.type === 'Day Out' && styles.activeButton]}
          onPress={() => handleInputChange('type', 'Day Out')}
        >
          <Text style={styles.buttonText}>Day Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.outingTypeButton, form.type === 'Night Out' && styles.activeButton]}
          onPress={() => handleInputChange('type', 'Night Out')}
        >
          <Text style={styles.buttonText}>Night Out</Text>
        </TouchableOpacity>
      </View>

      {/* Out Time Picker */}
      <TouchableOpacity onPress={showOutTimePicker} style={styles.dateButton}>
        <Text style={styles.buttonText}>Select Out Time: {form.outTime || 'Pick a Time'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isOutTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmOutTime}
        onCancel={hideOutTimePicker}
      />

      {/* Return Time Picker */}
      <TouchableOpacity onPress={showReturnTimePicker} style={styles.dateButton}>
        <Text style={styles.buttonText}>Select Return Time: {form.returnTime || 'Pick a Time'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isReturnTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmReturnTime}
        onCancel={hideReturnTimePicker}
      />

      {/* Date Picker */}
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.buttonText}>Select Date: {form.date || 'Pick a Date'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      {/* File Upload Button */}
      <TouchableOpacity onPress={handleFileUpload} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Supporting Document</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Pass Request</Text>
      </TouchableOpacity>
    </View>
  );

  // Render the FlatList with header and data
  return (
    <LinearGradient colors={['rgba(204, 51, 51, 0.8)', 'rgba(153, 153, 153, 0.8)']} style={styles.container}>
      <FlatList
      data={passes}
      // renderItem={renderPassItem}
      // keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Notification notifications={notifications} />
          {renderForm()}
        </View>
      }
    />
    </LinearGradient>
    
  );
}

// Styles for the dashboard
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  headerContainer: { padding: 20 },
  formContainer: { marginBottom: 20 },
  formHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  outingTypeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  outingTypeButton: { padding: 10, borderRadius: 5, borderColor: '#ccc', borderWidth: 1, flex: 1, marginRight: 5 },
  activeButton: { backgroundColor: '#007bff' },
  buttonText: { color: '#fff', textAlign: 'center' },
  dateButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, marginBottom: 10 },
  uploadButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, marginBottom: 10 },
  uploadButtonText: { color: '#fff', textAlign: 'center' },
  submitButton: { backgroundColor: '#dc3545', padding: 15, borderRadius: 5, marginBottom: 10 },
  submitButtonText: { color: '#fff', textAlign: 'center' },
  passCard: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
  passText: { fontSize: 16 },
  statusText: { fontWeight: 'bold' },
  reasonText: { marginTop: 5, fontStyle: 'italic' },
  statusApproved: { color: 'green' },
  statusCanceled: { color: 'red' },
});
