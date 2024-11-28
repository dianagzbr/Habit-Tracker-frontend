import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AccountScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const validatePassword = () => {
    if (password.length < 8) {
      Alert.alert('Validation Error', 'Debes agregar una contraseña de al menos 8 digitos.');
      return false;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (!name.trim()) {
      setModalMessage('El nombre es obligatorio.');
      setModalVisible(true);
      return false;
    }
    if(name.includes(' ')) {
      setModalMessage('No se permiten espacios en el nombre.Por favor, use guiones bajos (_) en su lugar.');
      setModalVisible(true);
      return false;
    }
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setModalMessage('Por favor, ingrese una dirección de correo electrónico válida.');
      setModalVisible(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');  
        if (!token) {
          console.error('No se encontró el token de usuario');
          return;
        }
        const response = await axios.post(
          'http://192.168.1.143:8000/api/profile/',
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const { username, email, foto_perfil, id } = response.data;
        setName(username);
        setEmail(email);
        setProfileImage(foto_perfil);
        setUserId(id);
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
        Alert.alert('Error', 'No se pudo cargar la información del perfil.');
      }
    }; 
    fetchUserData();
  }, [userId]);


    const handleUpdate = async () => {
      if (validateForm()) {
        try {
          const formData = new FormData();
    
          formData.append('username', name);
          formData.append('email', email);
    
        if (profileImage && profileImage.startsWith('file://')) {
          const filename = profileImage.split('/').pop(); 
          const fileExtension = filename.split('.').pop();
          const mimeType = `image/${fileExtension}`; 
    
          formData.append('foto_perfil', {
            uri: profileImage,
            name: filename,
            type: mimeType,
          });
        }
          const response = await axios.patch(
            `http://192.168.1.143:8000/api/usuarios/${userId}/`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data', 
              },
            }
          );     
          if (password) {
          if(validatePassword()) {
            const response = await axios.post('http://192.168.1.143:8000/api/resetpassword', {
              email: email,
              password: password,
            }
            );
          }}
            Alert.alert('Éxito', 'Tu perfil ha sido actualizado correctamente.');
            console.log('Datos actualizados:', response.data);
           
        } catch (error) {
          console.error('Error al actualizar el perfil:', error);
          Alert.alert('Error', 'No se pudo actualizar el perfil.');
        }
      }
      
    };
  
  

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta</Text>
      <TouchableOpacity onPress={handlePickImage} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <AntDesign name="user" size={50} color="#FF742B" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Entypo name="edit" size={20} color="#FF742B" style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Entypo name="edit" size={20} color="#FF742B" style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='********'
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Entypo name="eye-with-line" size={20} color="#FF742B" style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='********'
          style={styles.input}
          value={passwordConfirmation}
          secureTextEntry
          onChangeText={setPasswordConfirmation}
        />
        <Entypo name="eye-with-line" size={20} color="#FF742B" style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
  },
  icon: {
    marginLeft: 10,
  },
  updateButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF742B',
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
