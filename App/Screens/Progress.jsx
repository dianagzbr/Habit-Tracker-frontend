import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ProgressChart, PieChart } from 'react-native-chart-kit';
import { getCompletedHabits } from '../TestFiles/habitService';

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = () => {
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [monthlyProgress, setMonthlyProgress] = useState(0);
  const [completedHabits, setCompletedHabits] = useState([]);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const { weekly, monthly, completed } = await getCompletedHabits();
      setWeeklyProgress(weekly);
      setMonthlyProgress(monthly);
      setCompletedHabits(completed);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Progreso</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Progreso Semanal</Text>
        <ProgressChart
          data={{
            labels: ['Semana'],
            data: [weeklyProgress / 100],
          }}
          width={screenWidth - 40}
          height={150}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
        <Text style={styles.percentageText}>{weeklyProgress}% Completado</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Progreso Mensual</Text>
        <ProgressChart
          data={{
            labels: ['Mes'],
            data: [monthlyProgress / 100],
          }}
          width={screenWidth - 40}
          height={150}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
        <Text style={styles.percentageText}>{monthlyProgress}% Completado</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Hábitos Completados</Text>
        <PieChart
          data={completedHabits.map((habit) => ({
            name: habit.nombre,
            population: habit.completado,
            color: getRandomColor(),
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          }))}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
        />
      </View>
    </ScrollView>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(255, 116, 43, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
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
  sectionContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressScreen;
