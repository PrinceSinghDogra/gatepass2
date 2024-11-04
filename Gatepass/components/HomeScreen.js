import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'https://static4.depositphotos.com/1003326/319/i/450/depositphotos_3191160-stock-photo-blurry-bright-background.jpg' }}
        style={styles.background}
        blurRadius={2}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/f5/98/ee/f598ee10179fe7a47ffea40ce625b21d.png' }}
              style={styles.profileImage}
            />
            <Text style={styles.headerText}>Hostel Gate Pass Management System</Text>
          </View>

          {/* Student Section */}
          <View style={styles.card}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png' }} style={styles.logo} />
            <Text style={styles.cardTitle}>Student</Text>
            <Text style={styles.cardDescription}>Login to apply for your gate pass.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StudentLogin')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StudentSignup')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* Warden Section */}
          <View style={styles.card}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10/10910.png' }} style={styles.logo} />
            <Text style={styles.cardTitle}>Warden</Text>
            <Text style={styles.cardDescription}>Manage gate passes of students.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WardenLogin')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WardenSignup')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* Guard Section */}
          <View style={styles.card}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1022/1022382.png' }} style={styles.logo} />
            <Text style={styles.cardTitle}>Guard</Text>
            <Text style={styles.cardDescription}>Monitor gate pass entries and exits.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GuardLogin')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GuardSignup')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: 'white',
    borderWidth: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    width: '90%',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
