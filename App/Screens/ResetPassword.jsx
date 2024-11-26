// ResetPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const ResetPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params; 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateForm = () => {
    if (newPassword.length < 8) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters long.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return false;
    }
    return true;
  };

  const handlePasswordReset = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://192.168.1.143:8000/api/resetpassword/', {
          email: email,
          password: newPassword,
        });

        if (response.status === 200) {
          const { token, user } = response.data;

          await AsyncStorage.setItem("authToken", token);
          console.log("Token guardado:", token);

          Alert.alert("Nuevo registro de contraseña exitoso", `Bienvenido, ${user.username}!`);
          const userId = response.data.id
          navigation.navigate('HomeScreen', {userId});
        } else {
          Alert.alert('Error', 'Hubo un error en el registro. Inténtalo nuevamente.');
        }
      } catch (error) {
        console.error('Error al registrar al usuario:', error.response?.data || error.message);
        Alert.alert('Error', 'Hubo un error en el registro. Verifica los datos e inténtalo de nuevo.');
      }

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Ingrese su nueva contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />

        <LinearGradient 
            colors={['#FF742B', '#FF8C48']} 
            style={styles.button}
        >
            <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
                <Text style={styles.buttonText}>Restablecer Contraseña</Text>
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
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
    marginVertical: -50,
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
});

export default ResetPasswordScreen;
