import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de Privacidad</Text>
      <Text style={styles.paragraph}>
        1. Recolección de Datos: Recopilamos datos personales (por ejemplo, nombre, correo electrónico) y datos de uso de la aplicación. Estos datos se usan para mejorar la experiencia del usuario y la funcionalidad de la aplicación.
      </Text>
      <Text style={styles.paragraph}>
        2. Uso de Datos: Los datos personales se usan únicamente para fines relacionados con la operación de la aplicación, como la personalización de funciones y la gestión de la cuenta.
      </Text>
      <Text style={styles.paragraph}>
        3. Protección de Datos: Implementamos medidas de seguridad para proteger la información del usuario. Sin embargo, no podemos garantizar la seguridad absoluta de los datos en caso de incidentes fuera de nuestro control.
      </Text>
      <Text style={styles.paragraph}>
        4. Compartición de Datos: No compartimos datos personales con terceros sin el consentimiento explícito del usuario, excepto en casos requeridos por la ley.
      </Text>
      <Text style={styles.paragraph}>
        5. Uso de Cookies: Utilizamos cookies para mejorar la funcionalidad de la aplicación y personalizar la experiencia del usuario. Las cookies se pueden desactivar en la configuración del navegador o dispositivo, pero esto podría afectar la funcionalidad de la aplicación.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;
