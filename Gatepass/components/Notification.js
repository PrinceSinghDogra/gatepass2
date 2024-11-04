// Notification.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Notification = ({ notifications }) => {
  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationHeader}>Notifications</Text>
      <ScrollView style={styles.notificationScroll}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Text key={index} style={styles.notificationText}>
              {notification}
            </Text>
          ))
        ) : (
          <Text style={styles.notificationText}>No Notifications</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    elevation: 3,
  },
  notificationHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationScroll: {
    maxHeight: 100,
  },
  notificationText: {
    marginBottom: 5,
  },
});

export default Notification;
