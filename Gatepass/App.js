import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import StudentSignup from './components/StudentSignup';
import StudentLogin from './components/StudentLogin';
import WardenSignup from './components/WardenSignup';
import WardenLogin from './components/WardenLogin';
import GuardSignup from './components/GuardSignup';
import GuardLogin from './components/GuardLogin';
import StudentDashboard from './components/StudentDashboard';
import WardenDashboard from './components/WardenDashboard';
import GuardDashboard from './components/GuardDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StudentSignup" component={StudentSignup} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="WardenSignup" component={WardenSignup} />
        <Stack.Screen name="WardenLogin" component={WardenLogin} />
        <Stack.Screen name="GuardSignup" component={GuardSignup} />
        <Stack.Screen name="GuardLogin" component={GuardLogin} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="WardenDashboard" component={WardenDashboard} />
        <Stack.Screen name="GuardDashboard" component={GuardDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
