import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import CustomModal from '../Components/CustomModal'
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateForm = () => {
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setModalMessage('Por favor, ingresa una dirección de correo electrónico válida.');
      setModalVisible(true);
      return false;
    }
    if (password.length < 8) {
      setModalMessage('La contraseña debe tener al menos 8 caracteres.');
      setModalVisible(true);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://192.168.1.143:8000/api/login/', {
          email: email,
          password: password,
        });

        const { token, user } = response.data;

        if (response.status === 200) {

          await AsyncStorage.setItem('authToken', token);
          console.log('Token saved:', token);
  
          setModalMessage(`¡Inicio de Sesión Exitoso! Bienvenido, ${user.username}!`);
          setModalVisible(true);
          navigation.navigate('HomeScreen', { userId: user.id });
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;

          if (status === 404) {
            setModalMessage('Error: El correo electrónico no esta registrado.');
          } else if (status === 400) {
            setModalMessage('Error: La contraseña es incorrecta.');
          } else {
            setModalMessage(`Error inesperado: ${status}`);
          }
        } else if (error.request) {
          console.error('Network error:', error.request);
          setModalMessage('Error: No se pudo conectar al servidor. Por favor, verifica tu conexión a Internet.');
        } else {
          console.error('Error:', error.message);
          setModalMessage('Error: A ocurrido un error inesperado.');
        }
      }
      navigation.navigate('HomeScreen');  
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TouchableOpacity onPress={() => navigation.navigate("SingUpScreen")}>
        <Text style={styles.signUpText}>Registrarse</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("PasswordScreen")}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={['#FF742B', '#FF8C48']}
        style={styles.button}
      >
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Usando el Modal Reutilizable */}
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
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
  signUpText: {
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
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FF742B',
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

export default LoginScreen;
