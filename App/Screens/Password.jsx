import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const validateEmail = () => {
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handlePasswordRecovery = () => {
    if (validateEmail()) {
      // Generación de un token aleatorio de 5 dígitos
      //const token = Math.floor(10000 + Math.random() * 90000).toString();
      const token = '12345';

      // Lógica para simular el envío del token por correo (en producción, aquí se llamaría a un servicio)
      console.log("Token enviado a:", email, "Token:", token);

      // Navega a la pantalla de verificación y envía el token como parámetro
      navigation.navigate('VerifyOTPScreen', { token });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Enter your email below, we will send instructions to reset your password
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
  
      <LinearGradient
        colors={['#FF742B', '#FF8C48']}
        style={styles.button}
      >
        <TouchableOpacity onPress={handlePasswordRecovery} style={{ alignItems: 'center' }}>
          <Text style={styles.buttonText}>Submit</Text>
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

export default PasswordScreen;
