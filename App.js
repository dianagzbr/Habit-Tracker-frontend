// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './App/Screens/Register';
import LoginScreen from './App/Screens/Login';
import PasswordScreen from './App/Screens/Password';
import VerifyOTPScreen from './App/Screens/VerifyOTP';
import ResetPasswordScreen from './App/Screens/ResetPassword';
import HomeScreen from './App/Screens/Dashboard';
import ProgressScreen from './App/Screens/Progress';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen">
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
    <Stack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
