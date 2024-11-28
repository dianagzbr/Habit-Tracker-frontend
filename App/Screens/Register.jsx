import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import CustomModal from '../Components/CustomModal';
import axios from 'axios';


const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error','El nombre es obligatorio.');
      return false;
    }
    if(name.includes(' ')) {
      Alert.alert('Error','No se permiten espacios en el nombre.Por favor, use guiones bajos (_) en su lugar.');
      return false;
    }
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      Alert.alert('Error','Por favor, ingrese una dirección de correo electrónico válida.');
      return false;
    }
    if (password.length < 8) {
      Alert.alert('Error','La contraseña debe tener al menos 8 caracteres.');
      return false;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('error','Las contraseñas no coinciden.');
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

            Alert.alert('Datos validos','Revisa tu correo electrónico para que lo podamos comprobar');
            // Navega a la pantalla de verificación
            navigation.navigate('VerifyEmailScreen', { 
              OTPtoken: sendCodeResponse.data.code,
              userData: { name, email, password }
            });
          } else {
            Alert.alert('Error','Hubo un problema al enviar el código OTP. Inténtalo de nuevo.');
          }
        } else {
          Alert.alert('error','El correo o el nombre de usuario no están registrados.');
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;

          if (status === 400) {
            Alert.alert('Error','El correo electrónico o el nombre de usuario ya están registrados.');
          }  else {
            Alert.alert(`Error inesperado: ${status}`);
          }
        } else if (error.request) {
          console.error('Network error:', error.request);
          Alert.alert('Error','No se pudo conectar al servidor. Por favor verifique su conexión a Internet.');
        } else {
          console.error('Error:', error.message);
          Alert.alert('Error','Ocurrió un error inesperado.');
        }
      }
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        placeholder="Confirmar Contraseña"
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
