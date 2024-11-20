import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Términos y Condiciones</Text>
      <Text style={styles.paragraph}>
        1. Aceptación de los Términos: Al utilizar la aplicación de rastreo de hábitos ("Habit Tracker"), aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo, no debes usar la aplicación.
      </Text>
      <Text style={styles.paragraph}>
        2. Acceso y Uso de la Aplicación: El uso de la aplicación está destinado únicamente para uso personal y no comercial. El usuario es responsable de mantener la confidencialidad de su cuenta y de las actividades que se realicen en ella.
      </Text>
      <Text style={styles.paragraph}>
        3. Modificaciones: Nos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones se notificarán dentro de la aplicación, y se espera que los usuarios revisen los términos periódicamente.
      </Text>
      <Text style={styles.paragraph}>
        4. Responsabilidades del Usuario: El usuario se compromete a no usar la aplicación de manera que infrinja la ley o los derechos de terceros.
      </Text>
      <Text style={styles.paragraph}>
        5. Terminación: Nos reservamos el derecho de suspender o cancelar cuentas que incumplan estos términos.
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

export default TermsAndConditionsScreen;
