import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  //const { userId } = route.params;const { userId } = route.params;
  const [habits, setHabits] = useState([
    { id: 1, name: 'Meditating', completed: true },
    { id: 2, name: 'Read Philosophy', completed: true },
    { id: 3, name: 'Journaling', completed: false },
  ]);
  const [newHabit, setNewHabit] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
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
    if (newHabit.trim()) {
      const newId = habits.length ? habits[habits.length - 1].id + 1 : 1;
      setHabits([...habits, { id: newId, name: newHabit, completed: false }]);
      setNewHabit('');
    } else {
      Alert.alert('Validation Error', 'Please enter a habit name.');
    }
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
            <Text style={styles.greetingText}>Hello, <Text style={styles.usernameText}>Susy!</Text></Text>

            <View style={styles.progressCard}>
              <Text style={styles.progressText}>{calculateProgress()}%</Text>
              <Text style={styles.habitsText}>{habits.filter((habit) => habit.completed).length} of {habits.length} habits completed today!</Text>
            </View>

            <View style={styles.habitListContainer}>
              <View style={styles.habitListHeader}>
                <Text style={styles.habitListTitle}>Today Habit</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        data={habits}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={[styles.habitText, item.completed && styles.completedHabit]}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleToggleHabit(item.id)}>
              <MaterialIcons name={item.completed ? "check-box" : "check-box-outline-blank"} size={24} color="green" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <View style={styles.addHabitContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Habit"
              value={newHabit}
              onChangeText={setNewHabit}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
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
  addHabitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#00C853',
    borderRadius: 25,
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
