import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ProgressChart, PieChart } from 'react-native-chart-kit';
import { getCompletedHabits } from '../TestFiles/habitService';
import axios from "axios";

const screenWidth = Dimensions.get('window').width;

const ProgressScreen = ({ userId }) => {
  const [estadisticas, setEstadisticas] = useState([]);

  // Cargar estadísticas al montar el componente
  useEffect(() => {
    fetchEstadisticas();
  }, []);

  // Función para obtener estadísticas desde la API
  const fetchEstadisticas = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.143:8000/api/estadisticas/?userId=${userId}`
      );
      setEstadisticas(response.data); // Guardamos las estadísticas en el estado
    } catch (error) {
      console.error(
        'Error al obtener las estadísticas:',
        error.response?.data || error.message
      );
    }
  };

  // Configuración del gráfico
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  // Renderizar cada estadística como un gráfico
  const renderHabitStat = (item) => {
    const { habito_nombre, efectividad } = item;

    return (
      <View key={item.habito} style={styles.habitContainer}>
        <Text style={styles.habitTitle}>{habito_nombre}</Text>
        <ProgressChart
          data={{
            labels: ['Progreso'], // Etiqueta del gráfico
            data: [efectividad], // Efectividad en decimal (0-1)
          }}
          width={screenWidth - 40}
          height={150}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        <Text style={styles.percentageText}>
          {efectividad * 100}% Efectividad
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Progreso</Text>
      {estadisticas.map((stat) => renderHabitStat(stat))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  habitTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProgressScreen;
