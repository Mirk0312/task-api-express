// Importaciones
import { 
  createTask, 
  completeTask, 
  listTasks, 
  deleteTask, 
  listPendingTasks 
} from './services/task.service.js';
import { delay } from './utils/delay.js';
import { getAppName } from './utils/env.js';

// Imprime las tareas en tabla
const showTasks = (): void => {
  const rows = listTasks().map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt.toLocaleString()
  }));
  console.table(rows);
};

const main = async (): Promise<void> => {
  console.log(`\n${getAppName()}`);
  console.log('Iniciando aplicación...');
  await delay(300);

  // Muestra estado inicial
  console.log('\nTareas iniciales');
  showTasks();

  // Crea y completa una tarea
  const newTask = createTask('Construir mi primer servicio');
  console.log(`Tarea creada con id ${newTask.id}.`);
  completeTask(newTask.id);
  console.log(`Tarea ${newTask.id} completada.`);

  // Muestra lista de tareas pendientes
  const pendingTask = createTask('Estudiar Express para la siguiente clase');
  console.log('\nTareas pendientes:');
  console.table(listPendingTasks());

  // Eliminación de tarea
  try {
    const deleted = deleteTask(pendingTask.id);
    console.log(`\nÉxito: Tarea "${deleted.title}" (ID ${deleted.id}) eliminada.`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido.';
    console.error(`Error al eliminar: ${message}`);
  }

  // Probar error al intentar eliminar un ID que no existe
    try {
    deleteTask(999);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido.';
    console.error(`Error controlado al eliminar ID inexistente: ${message}`);
  }

  // Probar error al intentar completar la tarea de un ID que no existe
  try {
    completeTask(999);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    console.error(`Error controlado: ${message}`);
  }

  // Mostrar estado final
  console.log('\nEstado final');
  showTasks();
};

// Errores no controlados a nivel raíz
main().catch((error: unknown) => {
  console.error('Error no controlado:', error);
  process.exitCode = 1;
});