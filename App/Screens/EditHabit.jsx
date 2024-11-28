import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Switch, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EmojiPicker from 'rn-emoji-keyboard';
import CustomModal from '../Components/CustomModal';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import HomeScreen from './Home';
import moment from 'moment';

const AddHabitScreen = ({ route, navigation }) => {
  const { userId, habit } = route.params;

  const [newhabit, setHabit] = useState({
    ...habit,
    fecha_inicio: new Date(habit.fecha_inicio), // Convertir si es necesario
    fecha_fin: habit.fecha_fin ? new Date(habit.fecha_fin) : null,
    rango_tiempo_inicio: new Date(`1970-01-01T${habit.rango_tiempo_inicio}`),
    rango_tiempo_fin: new Date(`1970-01-01T${habit.rango_tiempo_fin}`),
    recordatorio_hora: new Date(`1970-01-01T${habit.recordatorio_hora}`),
    usuario: habit.usuario,
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInputChange = (field, value) => {
    setHabit({ ...newhabit, [field]: value });
    setHabit({ ...habit, [field]: value });
  };

  const handleDateChange = (event, selectedDate, field) => {
    if (selectedDate) {
      handleInputChange(field, selectedDate);
    }
    setShowStartDatePicker(false);
    setShowEndDatePicker(false);
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
    setShowReminderTimePicker(false);
  };

  const formatDate = (date) => {
    const day = String(date.getDate() + 1).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const validateForm = () => {
    if (!newhabit.nombre.trim()) {
      Alert.alert('Error','El nombre del hábito es obligatorio.');
      return false;
    }
    if (!newhabit.fecha_inicio) {
      Alert.alert('Error','La fecha de inicio es obligatoria.');
      return false;
    }
    if (!newhabit.fecha_fin) {
      Alert.alert('Error','La fecha de fin es obligatoria.');
      return false;
    }
    if (!newhabit.rango_tiempo_inicio || !habit.rango_tiempo_fin) {
      Alert.alert('Error','El rango de tiempo de inicio y fin son obligatorios.');
      return false;
    }
    if (newhabit.fecha_fin < habit.fecha_inicio) {
      Alert.alert('Error','La fecha de fin no puede ser anterior a la fecha de inicio.');
      return false;
    }
    return true;
  };
      
  
  const handleSaveHabit = () => {
    if (validateForm()) {
      const habitData = {
        nombre: newhabit.nombre,
        emoji: newhabit.emoji,
        fecha_inicio: newhabit.fecha_inicio.toISOString().split('T')[0],
        fecha_fin: newhabit.fecha_fin
          ? newhabit.fecha_fin.toISOString().split('T')[0]
          : null,
        rango_tiempo_inicio: moment(newhabit.rango_tiempo_inicio).format('HH:mm'),
        rango_tiempo_fin: moment(newhabit.rango_tiempo_fin).format('HH:mm'),
        recordatorio: newhabit.recordatorio,
        recordatorio_hora: moment(newhabit.recordatorio_hora).format('HH:mm'),
        usuario: userId,
      };

      // Cambiar de POST a PUT o PATCH para actualizar
      axios
        .put(`http://192.168.1.143:8000/api/habitos/${habit.id}/`, habitData)
        .then((response) => {
          Alert.alert('Exito','¡Hábito actualizado con éxito!');

          navigation.navigate('HomeScreen');
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.detail || 'Ocurrió un error al actualizar el hábito.';
          Alert.alert(`Error:`, `${errorMessage}`);
        });
    }
  };


  return (
    <FlatList
      data={[{ key: 'habitForm' }]}
      renderItem={() => (
        <View style={styles.container}>
          <Text style={styles.title}>Editar habito</Text>

          <Text style={styles.label}>Nombre del Hábito</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Hábito"
            value={newhabit.nombre}
            onChangeText={(value) => handleInputChange('nombre', value)}
          />

          <Text style={styles.label}>Emoji</Text>
          <TouchableOpacity style={styles.input} onPress={() => setIsEmojiPickerOpen(true)}>
            <Text>{habit.emoji ? habit.emoji : 'Selecciona un Emoji'}</Text>
          </TouchableOpacity>
          <EmojiPicker
            onEmojiSelected={(emoji) => handleInputChange('emoji', emoji.emoji)}
            open={isEmojiPickerOpen}
            onClose={() => setIsEmojiPickerOpen(false)}
          />

          <Text style={styles.label}>Fecha de Inicio</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowStartDatePicker(true)}>
            <Text>{`Fecha de Inicio: ${formatDate(newhabit.fecha_inicio)}`}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={habit.fecha_inicio}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event, date) => handleDateChange(event, date, 'fecha_inicio')}
            />
          )}

          <Text style={styles.label}>Fecha de Fin</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowEndDatePicker(true)}>
            <Text>{habit.fecha_fin ? `Fecha de Fin: ${formatDate(newhabit.fecha_fin)}` : 'Selecciona una Fecha'}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={habit.fecha_fin || habit.fecha_inicio}
              mode="date"
              display="default"
              minimumDate={habit.fecha_inicio}
              onChange={(event, date) => handleDateChange(event, date, 'fecha_fin')}
            />
          )}

          <Text style={styles.label}>Hora de Inicio</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowStartTimePicker(true)}>
            <Text>{`Hora de Inicio: ${formatTime(newhabit.rango_tiempo_inicio)}`}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={habit.rango_tiempo_inicio}
              mode="time"
              display="default"
              onChange={(event, date) => handleDateChange(event, date, 'rango_tiempo_inicio')}
            />
          )}

          <Text style={styles.label}>Hora de Fin</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowEndTimePicker(true)}>
            <Text>{`Hora de Fin: ${formatTime(newhabit.rango_tiempo_fin)}`}</Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={habit.rango_tiempo_fin}
              mode="time"
              display="default"
              onChange={(event, date) => handleDateChange(event, date, 'rango_tiempo_fin')}
            />
          )}

          <View style={styles.switchContainer}>
            <Text style={{fontSize: 16, fontWeight:'600'}}>Recordatorio</Text>
            <Switch
              value={habit.recordatorio}
              onValueChange={(value) => handleInputChange('recordatorio', value)}
            />
          </View>

          {habit.recordatorio && (
            <>
              <TouchableOpacity style={styles.input} onPress={() => setShowReminderTimePicker(true)}>
                <Text>{`Hora de Recordatorio: ${formatTime(newhabit.recordatorio_hora)}`}</Text>
              </TouchableOpacity>
              {showReminderTimePicker && (
                <DateTimePicker
                  value={newhabit.recordatorio_hora}
                  mode="time"
                  display="default"
                  onChange={(event, date) => handleDateChange(event, date, 'recordatorio_hora')}
                />
              )}
            </>
          )}

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveHabit}>
            <Text style={styles.saveButtonText}>Guardar Hábito</Text>
          </TouchableOpacity>

          <CustomModal
            visible={modalVisible}
            message={modalMessage}
            onClose={() => setModalVisible(false)}
          />
        </View>
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FF742B',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddHabitScreen;
