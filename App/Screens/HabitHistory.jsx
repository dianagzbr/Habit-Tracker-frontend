import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const HabitHistoryScreen = ({ route, navigation }) => {
  const [habits, setHabits] = useState([
    {
        id: 1,
        nombre: 'Meditating',
        emoji: '🧘',
        fecha_inicio: '2023-11-01',
        fecha_fin: '2023-11-30',
        dias_semana: 'Mon, Wed, Fri',
        rango_tiempo_inicio: '08:00',
        rango_tiempo_fin: '09:00',
        recordatorio: true,
        recordatorio_hora: '07:30',
        completed: true,
      },
      {
        id: 2,
        nombre: 'Read Philosophy',
        emoji: '📖',
        fecha_inicio: '2023-11-01',
        fecha_fin: '2023-11-30',
        dias_semana: 'Tue, Thu',
        rango_tiempo_inicio: '20:00',
        rango_tiempo_fin: '21:00',
        recordatorio: false,
        recordatorio_hora: null,
        completed: false,
      },
      {
        id: 3,
        nombre: 'Journaling',
        emoji: '📓',
        fecha_inicio: '2023-11-01',
        fecha_fin: '2023-11-30',
        dias_semana: 'Daily',
        rango_tiempo_inicio: '21:00',
        rango_tiempo_fin: '21:30',
        recordatorio: true,
        recordatorio_hora: '20:45',
        completed: true,
      },
  ]);

  useEffect(() => {
    if (route.params?.habits) {
      setHabits(route.params.habits);
    }
  }, [route.params?.habits]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Hábitos</Text>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={styles.habitText}>{item.emoji} {item.nombre}</Text>
            <Text style={styles.habitDetails}>Fecha de Inicio: {item.fecha_inicio}</Text>
            <Text style={styles.habitDetails}>Fecha de Fin: {item.fecha_fin}</Text>
            <Text style={styles.habitDetails}>Horas: {item.rango_tiempo_inicio} - {item.rango_tiempo_fin}</Text>
            <Text style={styles.habitDetails}>Recordatorio: {item.recordatorio ? `Si, a las ${item.recordatorio_hora}` : 'No'}</Text>
            <Text style={styles.habitDetails}>
              Estado: {item.completed ? 'Completado ✅' : 'No Completado ❌'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Regresar a Inicio</Text>
      </TouchableOpacity>
    </View>
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
    alignSelf: 'center',
  },
  habitItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  habitText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  habitDetails: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FF742B',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HabitHistoryScreen;
