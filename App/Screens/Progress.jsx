import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = () => {
  const [timePeriod, setTimePeriod] = useState('This Month');
  const [goals, setGoals] = useState([
    { id: 1, name: 'Journaling everyday', progress: 100, achieved: true },
    { id: 2, name: 'Cooking Practice', progress: 100, achieved: true },
    { id: 3, name: 'Vitamin', progress: 70, achieved: false },
  ]);

  const totalGoals = goals.length;
  const achievedGoals = goals.filter((goal) => goal.achieved).length;
  const notAchievedGoals = totalGoals - achievedGoals;
  const progressPercentage = totalGoals ? Math.round((achievedGoals / totalGoals) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Progress Report</Text>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>{timePeriod}</Text>
        <TouchableOpacity>
          <AntDesign name="caretdown" size={16} color="#777" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
        </View>
      </View>

      <Text style={styles.goalSummary}>{achievedGoals} Habits goal has achieved</Text>
      <Text style={styles.goalSummary}>{notAchievedGoals} Habits goal hasn't achieved</Text>

      <View style={styles.goalListContainer}>
        <View style={styles.goalListHeader}>
          <Text style={styles.goalListTitle}>Your Goals</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={goals}
          renderItem={({ item }) => (
            <View style={styles.goalItem}>
              <View style={styles.goalProgressContainer}>
                <Text style={styles.goalProgressText}>{item.progress}%</Text>
              </View>
              <View style={styles.goalInfoContainer}>
                <Text style={styles.goalName}>{item.name}</Text>
                <Text style={[styles.goalStatus, item.achieved ? styles.achieved : styles.unachieved]}>
                  {item.achieved ? 'Achieved' : 'Unachieved'}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: '#FF742B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF742B',
  },
  goalSummary: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  goalListContainer: {
    marginBottom: 20,
  },
  goalListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#FF742B',
  },
  goalItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  goalProgressContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF742B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  goalProgressText: {
    color: 'white',
    fontWeight: 'bold',
  },
  goalInfoContainer: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  goalStatus: {
    fontSize: 14,
  },
  achieved: {
    color: 'green',
  },
  unachieved: {
    color: 'red',
  },
});

export default ProgressScreen;
