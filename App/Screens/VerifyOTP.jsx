import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const VerifyOTPScreen = ({ route, navigation }) => {
    const { token } = route.params; // Obtenemos el token desde los parámetros de navegación
    const [otp, setOtp] = useState(['', '', '', '', '']); // Arreglo para cada dígito del OTP
    const inputRefs = useRef([]); // Creamos las referencias para cada campo de OTP
  
    // Maneja el cambio de cada dígito del OTP
    const handleChange = (text, index) => {
      if (/^\d*$/.test(text)) { // Solo permite números
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
  
        // Enfoca automáticamente el siguiente campo si el usuario ingresó un número
        if (text && index < 4) {
          inputRefs.current[index + 1].focus();
        }
      }
    };
  
    const verifyOtp = () => {
      const otpCode = otp.join('');
      if (otpCode === token) {
        Alert.alert('Éxito', 'Código OTP verificado correctamente.');
        navigation.navigate('ResetPasswordScreen'); // Navega a la pantalla de restablecimiento de contraseña
      } else {
        Alert.alert('Error', 'Código OTP incorrecto. Intente de nuevo.');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Enter OTP code we've sent to your email</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            ref={(ref) => inputRefs.current[index] = ref}
          />
        ))}
      </View>

      <LinearGradient
        colors={['#FF742B', '#FF8C48']}
        style={styles.button}
      >
        <TouchableOpacity onPress={verifyOtp}>
          <Text style={styles.buttonText}>Verify OTP</Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30,
  },
  otpInput: {
    width: 40,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FF742B',
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

export default VerifyOTPScreen;
