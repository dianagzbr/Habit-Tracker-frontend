import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUpScreen from './App/Screens/Register';
import LoginScreen from './App/Screens/Login';
import HomeScreen from './App/Screens/Dashboard';
import ProgressScreen from './App/Screens/Progress';

export default function App() {
  return (
    <ProgressScreen/>
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
