// App/services/habitService.js
export const getCompletedHabits = async () => {
    // Aquí puedes definir la lógica para obtener los datos de hábitos completados.
    // Por ejemplo, hacer una llamada a una API o procesar datos desde el almacenamiento local.
    return {
      weekly: 80, // Ejemplo de progreso semanal.
      monthly: 60, // Ejemplo de progreso mensual.
      completed: [
        { nombre: 'Meditación', completado: 1 },
        { nombre: 'Lectura', completado: 2 },
        { nombre: 'Ejercico', completado: 5 },
      ],
    };
  };
  