import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import EmojiPicker from 'rn-emoji-keyboard';
import CustomModal from '../Components/CustomModal';

const EditHabitScreen = ({ route, navigation }) => {
  const { habit, userId } = route.params;

  const parseDate = (dateString) => {
    // Parsear la fecha en formato "dd/mm/aaaa"
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

  // Inicializar el estado con la fecha convertida si está en formato "dd/mm/aaaa"
  const [habitName, setHabitName] = useState(habit.nombre || '');
  const [emoji, setEmoji] = useState(habit.emoji || '');
  const [startDate, setStartDate] = useState(habit.fecha_inicio ? parseDate(habit.fecha_inicio) : new Date());
  const [endDate, setEndDate] = useState(habit.fecha_fin ? parseDate(habit.fecha_fin) : null);
  const [startTime, setStartTime] = useState(habit.rango_tiempo_inicio ? new Date(`1970-01-01T${habit.rango_tiempo_inicio}:00`) : new Date());
  const [endTime, setEndTime] = useState(habit.rango_tiempo_fin ? new Date(`1970-01-01T${habit.rango_tiempo_fin}:00`) : new Date());
  const [reminder, setReminder] = useState(habit.recordatorio || false);
  const [reminderTime, setReminderTime] = useState(habit.recordatorio_hora ? new Date(`1970-01-01T${habit.recordatorio_hora}:00`) : new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Asegurar que las fechas sean válidas después de la carga
    if (!endDate) {
      setEndDate(new Date()); // Establecer una fecha de fin por defecto si no hay una
    }
  }, []);

  const validateForm = () => {
    if (!habitName.trim()) {
      setModalMessage('El nombre del hábito es obligatorio.');
      setModalVisible(true);
      return false;
    }
    if (!startDate || !endDate) {
      setModalMessage('La fecha de inicio y la fecha de fin son obligatorias.');
      setModalVisible(true);
      return false;
    }
    if (startDate > endDate) {
      setModalMessage('La fecha de fin debe ser posterior a la de inicio.');
      setModalVisible(true);
      return false;
    }
    return true;
  };
/*
  const handleSaveHabit = () => {
    if (validateForm()) {
      setModalMessage('¡Hábito actualizado con éxito!');
      setModalVisible(true);
      // Lógica para actualizar el hábito en el backend
    }
  };
*/
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
        recordatorio_hora: habit.recordatorio_hora,
        usuario: userId, // Define correctamente el usuario antes de usar la función
      };
      
  
      axios.patch('http://192.168.1.143:8000/api/habitos/', habitData, { },
        )
        .then((response) => {
          setModalMessage('¡Hábito modificado con éxito!');
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

  const handleEmojiSelected = (e) => {
    setEmoji(e.emoji);
    setShowEmojiPicker(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time.getTime())) return '';
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Hábito</Text>

      <Text style={styles.label}>Nombre del Hábito</Text>
      <TextInput
        placeholder="Nombre del Hábito"
        style={styles.input}
        value={habitName}
        onChangeText={setHabitName}
      />

      <Text style={styles.label}>Emoji</Text>
      <TouchableOpacity onPress={() => setShowEmojiPicker(true)} style={styles.input}>
        <Text>{emoji ? emoji : 'Seleccionar un Emoji'}</Text>
      </TouchableOpacity>
      {showEmojiPicker && (
        <EmojiPicker 
          onEmojiSelected={handleEmojiSelected} 
          onClose={() => setShowEmojiPicker(false)}
          open={showEmojiPicker}
        />
      )}

      <Text style={styles.label}>Fecha de Inicio</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
        <Text>{startDate ? formatDate(startDate) : 'Seleccionar Fecha'}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Fecha de Fin</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.input}>
        <Text>{endDate ? formatDate(endDate) : 'Seleccionar Fecha'}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Hora de Inicio</Text>
      <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.input}>
        <Text>{formatTime(startTime)}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowStartTimePicker(false);
            if (selectedTime) setStartTime(selectedTime);
          }}
        />
      )}

      <Text style={styles.label}>Hora de Fin</Text>
      <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.input}>
        <Text>{formatTime(endTime)}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowEndTimePicker(false);
            if (selectedTime) setEndTime(selectedTime);
          }}
        />
      )}

      <View style={styles.reminderContainer}>
        <Text style={styles.label}>Recordatorio</Text>
        <TouchableOpacity onPress={() => setReminder(!reminder)}>
          <AntDesign name={reminder ? 'checksquare' : 'checksquareo'} size={24} color="#FF742B" />
        </TouchableOpacity>
      </View>

      {reminder && (
        <>
          <Text style={styles.label}>Hora del Recordatorio</Text>
          <TouchableOpacity onPress={() => setShowReminderTimePicker(true)} style={styles.input}>
            <Text>{formatTime(reminderTime)}</Text>
          </TouchableOpacity>
          {showReminderTimePicker && (
            <DateTimePicker
              value={reminderTime}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowReminderTimePicker(false);
                if (selectedTime) setReminderTime(selectedTime);
              }}
            />
          )}
        </>
      )}

      <LinearGradient
        colors={['#FF742B', '#FF8C48']}
        style={styles.button}
      >
        <TouchableOpacity onPress={handleSaveHabit}>
          <Text style={styles.buttonText}>Actualizar Hábito</Text>
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
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
    justifyContent: 'center',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

export default EditHabitScreen;
