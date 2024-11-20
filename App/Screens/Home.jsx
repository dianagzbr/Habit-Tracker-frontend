import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      nombre: 'Meditating',
      emoji: '🧘',
      fecha_inicio: '01/11/2024',
      fecha_fin: '30/11/2024',
      dias_semana: 'Mon, Wed, Fri',
      rango_tiempo_inicio: '08:00',
      rango_tiempo_fin: '09:00',
      recordatorio: true,
      recordatorio_hora: '07:30',
      usuario: 'Susy',
      completed: true,
    },
    {
      id: 2,
      nombre: 'Read Philosophy',
      emoji: '📚',
      fecha_inicio: '01/11/2024',
      fecha_fin: '30/11/2024',
      dias_semana: 'Tue, Thu',
      rango_tiempo_inicio: '20:00',
      rango_tiempo_fin: '21:00',
      recordatorio: false,
      recordatorio_hora: null,
      usuario: 'Susy',
      completed: true,
    },
    {
      id: 3,
      nombre: 'Journaling',
      emoji: '📝',
      fecha_inicio: '01/11/2024',
      fecha_fin: '30/11/2024',
      dias_semana: 'Daily',
      rango_tiempo_inicio: '21:00',
      rango_tiempo_fin: '21:30',
      recordatorio: true,
      recordatorio_hora: '20:45',
      usuario: 'Susy',
      completed: false,
    },
  ]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('es-MX', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleToggleHabit = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const handleAddHabit = () => {
    navigation.navigate('AddHabit');
  };

  const handleViewHabitDetails = (habit) => {
    navigation.navigate('HabitDetail', { habit });
  };

  const calculateProgress = () => {
    const completedHabits = habits.filter((habit) => habit.completed).length;
    return habits.length ? Math.round((completedHabits / habits.length) * 100) : 0;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Text style={styles.greetingText}>Hola, <Text style={styles.usernameText}>Susy!</Text></Text>

            <TouchableOpacity onPress={() => navigation.navigate("ProgressScreen")}>
              <View style={styles.progressCard}>
                <Text style={styles.progressText}>{calculateProgress()}%</Text>
                <Text style={styles.habitsText}>{habits.filter((habit) => habit.completed).length} de {habits.length} hábitos completados hoy!</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.habitListContainer}>
              <View style={styles.habitListHeader}>
                <Text style={styles.habitListTitle}>Hábitos del Día</Text>
                <TouchableOpacity onPress={() => navigation.navigate("HabitHistory")}>
                  <Text style={styles.seeAllText}>Ver todos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        data={habits}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <TouchableOpacity onPress={() => handleViewHabitDetails(item)} style={{ flex: 1 }}>
              <Text style={[styles.habitText, item.completed && styles.completedHabit]}>{item.emoji} {item.nombre}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleToggleHabit(item.id)}>
              <MaterialIcons name={item.completed ? "check-box" : "check-box-outline-blank"} size={24} color="green" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
          <AntDesign name="setting" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#777',
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  usernameText: {
    color: '#FF742B',
  },
  progressCard: {
    backgroundColor: '#FF8C48',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  habitsText: {
    fontSize: 16,
    color: 'white',
  },
  habitListContainer: {
    marginBottom: 20,
  },
  habitListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  habitListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#FF742B',
  },
  habitItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  habitText: {
    fontSize: 16,
  },
  completedHabit: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FF8C48',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2.62,
    elevation: 4,
  },
  settingsButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FF8C48',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default HomeScreen;
