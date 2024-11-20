import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return false;
    }
    if(name.includes(' ')) {
      Alert.alert('Validation Error', 'Spaces are not allowed in the name. Please use underscores (_) instead.');
      return false;
    }
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    if (password.length < 8) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters long.');
      return false;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  const handlePasswordRecovery = async () => {
    if (validateForm()) {
      try {
        const checkResponse = await axios.post('http://192.168.1.143:8000/api/checkdata/', {
          username: name,
          email: email,
        });

        if (checkResponse.status === 200) {
          const sendCodeResponse = await axios.post('http://192.168.1.143:8000/api/send-code/', { 
            email
          });

          if (sendCodeResponse.status === 200) {
            const { message } = sendCodeResponse.data;
            console.log(message);
            console.log('Respuesta del backend:', sendCodeResponse.data);

            Alert.alert(
              "Valid data", "Check your emai");
            // Navega a la pantalla de verificación
            navigation.navigate('VerifyEmailScreen', { 
              OTPtoken: sendCodeResponse.data.code,
              userData: { name, email, password }
            });
          } else {
            alert('Hubo un problema al enviar el código OTP. Inténtalo de nuevo.');
          }
        } else {
          alert('El correo o el nombre de usuario no están registrados.');
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;

          if (status === 400) {
            Alert.alert('Error', 'The email or username is already registered.');
          }  else {
            Alert.alert('Error', `Unexpected error: ${status}`);
          }
        } else if (error.request) {
          console.error('Network error:', error.request);
          Alert.alert('Error', 'Could not connect to the server. Please check your Internet connection.');
        } else {
          console.error('Error:', error.message);
          Alert.alert('Error', 'An unexpected error occurred.');
        }
      }
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Password Confirmation"
        style={styles.input}
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />

      <LinearGradient
        colors={['#FF742B', '#FF8C48']}
        style={styles.button}
      >
        <TouchableOpacity onPress={handlePasswordRecovery}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  loginText: {
    color: '#FF742B',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#777',
    marginVertical: 10,
  },
  googleButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default SignUpScreen;
