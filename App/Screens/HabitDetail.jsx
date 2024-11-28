import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const HabitDetailScreen = ({ route, navigation }) => {
  const { habit, userId } = route.params;

 
  const handleEditHabit = () => {
    
    const validatedHabit = {
      ...habit,
      fecha_inicio: new Date(habit.fecha_inicio), // Asegúrate de que sea un objeto Date
      fecha_fin: habit.fecha_fin ? new Date(habit.fecha_fin) : null, // Validar si existe fecha_fin
      rango_tiempo_inicio: new Date(`1970-01-01T${habit.rango_tiempo_inicio}`), // Convertir rangos de tiempo
      rango_tiempo_fin: new Date(`1970-01-01T${habit.rango_tiempo_fin}`),
      recordatorio_hora: new Date(`1970-01-01T${habit.recordatorio_hora}`), // Lo mismo para el recordatorio
      usuario: habit.usuario,
    };
  
    navigation.navigate('EditHabit', { habit: validatedHabit, userId });
  };

  
  const handleDeleteHabit = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.1.143:8000/api/habitos/${habit.id}/`, // Asegúrate de que esta URL sea la correcta para eliminar el hábito
        { }
      );

      if (response.status === 204) {
        Alert.alert(
          'Hábito eliminado',
          `El hábito ha sido eliminado exitosamente.`,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error al eliminar el hábito:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el hábito. Intenta nuevamente.');
    }
  };

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{habit.emoji} {habit.nombre}</Text>
      <View style={styles.detailCard}>
        <Text style={styles.detailText}>Fecha de Inicio: <Text style={styles.detailValue}>{habit.fecha_inicio}</Text></Text>
        <Text style={styles.detailText}>Fecha de Fin: <Text style={styles.detailValue}>{habit.fecha_fin}</Text></Text>
        <Text style={styles.detailText}>Rango de Tiempo: <Text style={styles.detailValue}>{habit.rango_tiempo_inicio} - {habit.rango_tiempo_fin}</Text></Text>
        <Text style={styles.detailText}>Recordatorio: <Text style={styles.detailValue}>{habit.recordatorio ? 'Yes' : 'No'}</Text></Text>
        {habit.recordatorio && (
          <Text style={styles.detailText}>Hora de Recordatorio: <Text style={styles.detailValue}>{habit.recordatorio_hora}</Text></Text>
        )}
      </View>
      <View style={styles.detailButtons}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditHabit}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteHabit}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF742B',
    marginBottom: 30,
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  detailValue: {
    fontWeight: 'normal',
    color: '#555',
  },
  detailButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',
  },
  editButton: {
    backgroundColor: '#FFA726',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#E57373',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HabitDetailScreen;
