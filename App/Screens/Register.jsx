import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

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

  const handlePasswordRecovery = () => {
    if (validateForm()) {
      // Generación de un token aleatorio de 5 dígitos
      const token = Math.floor(10000 + Math.random() * 90000).toString();

      // Lógica para simular el envío del token por correo (en producción, aquí se llamaría a un servicio)
      console.log("Token enviado a:", email, "Token:", token);

      // Navega a la pantalla de verificación y envía el token como parámetro
      navigation.navigate('VerifyEmailScreen', { token });
    }
  };

/*
  const handleSignUp = () => {
    if (validateForm()) {
      // Proceed with sign-up logic
      Alert.alert('Success', 'Form is valid! Proceeding with sign-up...');
    }
  };
*/
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

      <Text style={styles.orText}>Or sign up with:</Text>

      <TouchableOpacity style={styles.googleButton}>
        <AntDesign name="google" size={24} color="black" />
      </TouchableOpacity>
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
