//verifyEmail
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import CustomModal from '../Components/CustomModal';
import axios from 'axios';

const VerifyEmailScreen = ({ route, navigation }) => {
    const { OTPtoken, userData } = route.params; 
    const [otp, setOtp] = useState(['', '', '', '', '']); 
    const inputRefs = useRef([]);

    console.log('Token recibidooo:', OTPtoken);

    const handleChange = (text, index) => {
      if (/^\d*$/.test(text)) { 
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
 
        if (text && index < 4) {
          inputRefs.current[index + 1].focus();
        }
      }
    };

    const verifyOtp = async () => {
      const otpCode = otp.join('');
      console.log('Código ingresado por el usuario:', otpCode);
  
      if (String(otpCode) === String(OTPtoken)) {
        try {
          const response = await axios.post('http://192.168.1.143:8000/api/register/', {
            username: userData.name,
            email: userData.email,
            password: userData.password,
          });
  
          if (response.status === 201) {
            const { token, user } = response.data;

            await AsyncStorage.setItem("authToken", token);
            console.log("Token guardado:", token);

            Alert.alert("Registro exitoso", `Bienvenido, ${user.username}!`);
            const userId = response.data.id
            navigation.navigate('HomeScreen', {userId});
          } else {
            Alert.alert('Error', 'Hubo un error en el registro. Inténtalo nuevamente.');
          }
        } catch (error) {
          console.error('Error al registrar al usuario:', error.response?.data || error.message);
          Alert.alert('Error', 'Hubo un error en el registro. Verifica los datos e inténtalo de nuevo.');
        }
      } else {
        Alert.alert('Error', 'Código OTP incorrecto. Intenta de nuevo.');
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

export default VerifyEmailScreen;