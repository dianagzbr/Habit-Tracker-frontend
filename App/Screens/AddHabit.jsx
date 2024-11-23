import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EmojiPicker from 'rn-emoji-keyboard';
import CustomModal from '../Components/CustomModal';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import HomeScreen from './Home';
import moment from 'moment';

const AddHabitScreen = ({ navigation }) => {
  const route = useRoute();
  const { userId } = route.params;
  const [habit, setHabit] = useState({
    nombre: '',
    emoji: '',
    fecha_inicio: new Date(),
    fecha_fin: null,
    rango_tiempo_inicio: new Date(),
    rango_tiempo_fin: new Date(),
    recordatorio: false,
    recordatorio_hora: new Date(),
    usuario: null,
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
    const day = String(date.getDate()).padStart(2, '0');
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
    if (!habit.nombre.trim()) {
      setModalMessage('El nombre del hábito es obligatorio.');
      setModalVisible(true);
      return false;
    }
    if (!habit.fecha_inicio) {
      setModalMessage('La fecha de inicio es obligatoria.');
      setModalVisible(true);
      return false;
    }
    if (!habit.fecha_fin) {
      setModalMessage('La fecha de fin es obligatoria.');
      setModalVisible(true);
      return false;
    }
    if (!habit.rango_tiempo_inicio || !habit.rango_tiempo_fin) {
      setModalMessage('El rango de tiempo de inicio y fin son obligatorios.');
      setModalVisible(true);
      return false;
    }
    if (habit.fecha_fin < habit.fecha_inicio) {
      setModalMessage('La fecha de fin no puede ser anterior a la fecha de inicio.');
      setModalVisible(true);
      return false;
    }
    return true;
  };


  const handleSaveHabit = () => {
    if (validateForm()) {
      const habitData = {
        nombre: habit.nombre,
        emoji: habit.emoji,
        fecha_inicio: habit.fecha_inicio.toISOString().split('T')[0], // Formatear la fecha
        fecha_fin: habit.fecha_fin ? habit.fecha_fin.toISOString().split('T')[0] : null,
        rango_tiempo_inicio: moment(habit.rango_tiempo_inicio).format('HH:mm'),
        rango_tiempo_fin: moment(habit.rango_tiempo_fin).format('HH:mm'),
        recordatorio: habit.recordatorio,
        recordatorio_hora: habit.recordatorio
          ? habit.recordatorio_hora.toISOString().split('T')[1].slice(0, 5)
          : null,
        usuario: userId, // Define correctamente el usuario antes de usar la función
      };
  
      axios.post('http://192.168.1.143:8000/api/habitos/', habitData, { },
        )
        .then((response) => {
          setModalMessage('¡Hábito guardado con éxito!');
          setModalVisible(true);
          
          navigation.navigate('HomeScreen');
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.detail || 'Ocurrió un error al guardar el hábito.';
          setModalMessage(`Error: ${errorMessage}`);
          setModalVisible(true);
        });
        
    }
  };


  return (
    <FlatList
      data={[{ key: 'habitForm' }]}
      renderItem={() => (
        <View style={styles.container}>
          <Text style={styles.title}>Añadir Hábito</Text>

          <Text style={styles.label}>Nombre del Hábito</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Hábito"
            value={habit.nombre}
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
            <Text>{`Fecha de Inicio: ${formatDate(habit.fecha_inicio)}`}</Text>
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
            <Text>{habit.fecha_fin ? `Fecha de Fin: ${formatDate(habit.fecha_fin)}` : 'Selecciona una Fecha'}</Text>
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
            <Text>{`Hora de Inicio: ${formatTime(habit.rango_tiempo_inicio)}`}</Text>
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
            <Text>{`Hora de Fin: ${formatTime(habit.rango_tiempo_fin)}`}</Text>
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
                <Text>{`Hora de Recordatorio: ${formatTime(habit.recordatorio_hora)}`}</Text>
              </TouchableOpacity>
              {showReminderTimePicker && (
                <DateTimePicker
                  value={habit.recordatorio_hora}
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
