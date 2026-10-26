# Pruebas de consultas de tareas

## Entorno
- Rama: feature/consultas-paginadas
- Base: task_api
- Colección: tasks
- Resultado de pnpm check: Correcto sin errores
- Resultado de pnpm build: Exitoso (compilado en dist/)

## Datos preparados
- Total de tareas: 5
- Tareas pending: 3
- Tareas completed: 2

## Casos ejecutados
| Tipo | Método y ruta | Esperado | Obtenido | requestId | Resultado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Positiva | GET /api/tasks?page=1&limit=2 | 200 | 200 | [OCULTO] | Éxito |
| Positiva | GET /api/tasks?status=completed | 200 | 200 | [OCULTO] | Éxito |
| Positiva | GET /api/tasks?search=api | 200 | 200 | [OCULTO] | Éxito |
| Negativa | GET /api/tasks?page=0 | 422 | 422 | req-001 | Éxito |
| Negativa | GET /api/tasks?sortBy=priority | 422 | 422 | req-002 | Éxito |
| Negativa | GET /api/tasks?owner=ana | 422 | 422 | req-003 | Éxito |
| Regresión | PATCH /api/tasks/:id/complete | 200 | 200 | [OCULTO] | Éxito |

## Evidencias
1. Compilación correcta mediante `pnpm check` y `pnpm build`.
2. Paginación correcta dividida en subconjuntos sin elementos repetidos.
3. Filtros y búsqueda parcial combinados exitosamente.
4. Ordenamiento controlado mediante valores permitidos (ascendente y descendente).
5. Manejo seguro de errores 422 con detalles estructurados e identificador único.
6. Operaciones CRUD heredadas funcionando sin alteraciones.
7. Persistencia de datos verificada tras reiniciar la aplicación Node.js.