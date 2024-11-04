import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import io from 'socket.io-client';

const WardenDashboard = () => {
  const [requests, setRequests] = useState(
    [
    { 
      id: 1, 
      studentName: 'John Doe', 
      roomNo: '101', 
      phoneNo: '9876543210', 
      hostelName: 'Alpha Hostel', 
      passType: 'Day Out', 
      time: '10:00 AM', 
      destination: 'City Center', 
      date: '2024-10-20', 
      status: 'Pending', 
      reason: '', 
      outReason: 'Meeting a friend' 
    },
    { 
      id: 2, 
      studentName: 'Jane Smith', 
      roomNo: '202', 
      phoneNo: '8765432109', 
      hostelName: 'Beta Hostel', 
      passType: 'Night Out', 
      time: '6:00 PM', 
      destination: 'Mall', 
      date: '2024-10-10', 
      status: 'Pending', 
      reason: '', 
      outReason: 'Shopping' 
    },
  ]
);
 
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [rejectionReason, setRejectionReason] = useState('');

  
  useEffect(()=>{ 
    io.on("connection",(socket)=>{
    socket.on("record",(record)=>{
      console.log("message of socket you learned socket almost", record);
    })
  })})
 

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleApprove = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Approved' } : request
      )
    );
  };

  const handleReject = (id) => {
    if (rejectionReason.trim() === '') {
      alert('Please provide a reason for rejection');
      return;
    }
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Rejected', reason: rejectionReason } : request
      )
    );
    setRejectionReason('');
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const renderRequestItem = ({ item }) => {
    const isApproved = item.status === 'Approved';
    const isRejected = item.status === 'Rejected';
    return (
      <View style={[styles.requestCard, isApproved ? styles.approved : isRejected ? styles.rejected : styles.pending]}>
        <Text style={styles.requestText}>Student: {item.studentName}</Text>
        <Text style={styles.requestText}>Room No: {item.roomNo}</Text>
        <Text style={styles.requestText}>Phone: {item.phoneNo}</Text>
        <Text style={styles.requestText}>Hostel: {item.hostelName}</Text>
        <Text style={styles.requestText}>Pass Type: {item.passType}</Text>
        <Text style={styles.requestText}>Time: {item.time}</Text>
        <Text style={styles.requestText}>Destination: {item.destination}</Text>
        <Text style={styles.requestText}>Date: {item.date}</Text>
        <Text style={styles.requestText}>Out Reason: {item.outReason}</Text>
        <Text style={[styles.statusText, isApproved ? styles.statusApproved : isRejected ? styles.statusRejected : styles.statusPending]}>
          Status: {item.status}
        </Text>
        {item.status === 'Pending' && (
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={() => handleApprove(item.id)} style={styles.approveButton}>
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Reason for rejection"
              style={styles.reasonInput}
              value={rejectionReason}
              onChangeText={(text) => setRejectionReason(text)}
            />
            <TouchableOpacity onPress={() => handleReject(item.id)} style={styles.rejectButton}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient colors={['rgba(204, 102, 102, 0.8)', 'rgba(153, 153, 153, 0.8)']} style={styles.container}>
      <Text style={styles.header}>Warden Dashboard</Text>
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
        <Picker.Item label="Rejected" value="Rejected" />
        <Picker.Item label="Pending" value="Pending" />
      </Picker>
      <FlatList
        data={filteredRequests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  picker: { height: 50, width: '100%', marginBottom: 20 },
  requestCard: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
  approved: { backgroundColor: '#d4edda' },
  rejected: { backgroundColor: '#f8d7da' },
  pending: { backgroundColor: '#fff3cd' },
  requestText: { fontSize: 16 },
  statusText: { fontWeight: 'bold' },
  actionContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  approveButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginRight: 5 },
  rejectButton: { backgroundColor: '#dc3545', padding: 10, borderRadius: 5 },
  reasonInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, flex: 1, marginRight: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
  statusApproved: { color: 'green' },
  statusRejected: { color: 'red' },
  statusPending: { color: 'orange' },
});

export default WardenDashboard;
