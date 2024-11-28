import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null); 
  const [name, setName] = useState('');
  const [habits, setHabits] = useState([]);
  const [marked, setMarked] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setAuthToken(token); // Guardamos el token en el estado
      } catch (error) {
        console.error('Error al obtener el token de AsyncStorage:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {//obtenemos la id del usuario de interes
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
        const { username, id } = response.data;
        setName(username);
        setUserId(id);
        console.log(id);
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
        Alert.alert('Error', 'No se pudo cargar la información del perfil.');
      }
    }; 
    fetchUserData();
  }, [authToken]);

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

  useEffect(() => {
    const fetchHabitsAndMarkCompleted = async () => {
      try {
        // Obtener la fecha actual
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];
  
        // Obtener hábitos del usuario
        const habitsResponse = await axios.get(
          `http://192.168.1.143:8000/api/habitos/?userId=${userId}`
        );
        const habitsData = habitsResponse.data || [];
  
        // Filtrar los hábitos para asegurarse de que la fecha de hoy esté en el rango de fecha_inicio y fecha_fin
        const today = new Date();
        const filteredHabits = habitsData.filter((habit) => {
          const fechaInicio = new Date(habit.fecha_inicio);
          const fechaFin = habit.fecha_fin ? new Date(habit.fecha_fin) : null;
  
          // Verifica si `today` está en el rango entre `fecha_inicio` y `fecha_fin`
          return (
            today >= fechaInicio && // Hoy es igual o posterior a la fecha de inicio
            (fechaFin === null || today <= fechaFin) // Hoy es igual o anterior a la fecha de fin, si existe
          );
        });
  
        // Obtener ejecuciones del día actual para el usuario
        const executionsResponse = await axios.get(
          `http://192.168.1.143:8000/api/ejecuciones/filtrar_por_usuario_y_fecha/?userId=${userId}&fecha=${formattedDate}`
        );
        const executionData = executionsResponse.data || []; // Verifica que haya datos
  
        // Actualizar hábitos con el estado completado según las ejecuciones
        const updatedHabits = filteredHabits.map((habit) => ({
          ...habit,
          completed: executionData.some(
            (execution) => execution.habito === habit.id
          ), // Si hay ejecución, marcar como completado
        }));
  
        // Actualizar el estado
        setHabits(updatedHabits);
      } catch (error) {
        console.error('Error al obtener los hábitos o ejecuciones:', error);
        alert('No se pudieron cargar los datos. Intenta nuevamente.');
      }
    };
  
    if (userId) {
      fetchHabitsAndMarkCompleted();
    }
  }, [userId]);

  const handleAddHabit = () => {
    navigation.navigate('AddHabit', {userId});
  };

  const handleViewHabitDetails = (habit) => {
    navigation.navigate('HabitDetail', { habit, userId });
  };

  const calculateProgress = () => {
    const completedHabits = habits.filter((habit) => habit.completed).length;
    return habits.length ? Math.round((completedHabits / habits.length) * 100) : 0;
  };

  const handleToggleHabit = async (habitId, completed) => {
    if (completed) {
      alert("Este hábito ya está completado y no se puede desmarcar.");
      return;
    }
  
    try {
      // Generar la fecha actual en formato "yyyy-mm-dd"
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
  
      // Llamar a la API para marcar el hábito como completado
      const response = await axios.post(
        "http://192.168.1.143:8000/api/ejecuciones/marcar_habito/",
        {
          habito: habitId,
          completado: true,
          fecha: formattedDate,
        }
      );
  
      console.log("Hábito completado:", response.data);
      function mostrarMensajeMotivacion() {
        const numero = Math.floor(Math.random() * 3) + 1;
        if (numero === 1) {
          Alert.alert('¡Gran trabajo! Cada pequeño paso te acerca a tu meta. 🚀');
        } else if (numero === 2) {
          Alert.alert('¡Sigue adelante! La constancia es la clave del éxito. 💪');
        } else if (numero === 3) {
          Alert.alert('¡Lo estás logrando! Recuerda, el esfuerzo vale la pena. 🌟');
        }
      }
      mostrarMensajeMotivacion();
  
      // Actualizar el estado local para reflejar el cambio
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === habitId ? { ...habit, completed: true } : habit
        )
      );
    } catch (error) {
      console.error(
        "Error al marcar el hábito como completado:",
        error.response?.data || error.message
      );
    }
  };

  const toggleHabitCompletion = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Text style={styles.greetingText}>Hola, <Text style={styles.usernameText}>{name || 'Cargando...'}</Text></Text>

            <TouchableOpacity onPress={() => navigation.navigate("ProgressScreen", {userId})}>
              <View style={styles.progressCard}>
                <Text style={styles.progressText}>{calculateProgress()}%</Text>
                <Text style={styles.habitsText}>{habits.filter((habit) => habit.completed).length} de {habits.length} hábitos completados hoy!</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.habitListContainer}>
              <View style={styles.habitListHeader}>
                <Text style={styles.habitListTitle}>Hábitos del Día</Text>
                <TouchableOpacity onPress={() => navigation.navigate('HabitHistory', {userId})}>
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
            <TouchableOpacity onPress={() => handleToggleHabit(item.id, item.completed)}disabled={item.completed}>
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
