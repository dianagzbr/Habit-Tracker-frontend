// ResetPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = () => {
    // Verifica que ambas contraseñas coincidan
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Aquí puedes agregar la lógica para enviar la nueva contraseña al backend
    Alert.alert('Éxito', 'Contraseña restablecida correctamente.');
    navigation.navigate('LoginScreen'); // Navega de vuelta a la pantalla de inicio de sesión
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
