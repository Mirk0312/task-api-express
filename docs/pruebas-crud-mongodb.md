# Pruebas del CRUD persistente

## Entorno
- Rama: feature/crud-persistente-completo
- Base: task_api
- Colección: tasks
- Resultado de pnpm check: Correcto sin errores de TypeScript
- Resultado de pnpm build: Exitoso (compilado en dist/)

## Recurso de prueba
- id devuelto por POST: 6702a4b8e912f3456789abcd
- title inicial: Preparar evidencia del CRUD
- title final: Documentar el CRUD persistente
- status final: completed
- Persistencia después de reiniciar: Confirmada, la tarea actualizada mantiene sus cambios.

## Casos ejecutados

| Tipo | Método y ruta | Datos | Esperado | Obtenido | requestId | Resultado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Positiva | POST /api/tasks | {"title":"Tarea"} | 201 | 201 | [OCULTO] | Éxito |
| Positiva | PATCH /api/tasks/:id | {"status":"completed"} | 200 | 200 | [OCULTO] | Éxito |
| Negativa | PATCH /api/tasks/:id | cuerpo vacío `{}` | 422 | 422 | req-001 | Éxito |
| Negativa | PATCH /api/tasks/:id | JSON mal formado | 400 | 400 | req-002 | Éxito |
| Negativa | PATCH /api/tasks/:id | sin application/json | 415 | 415 | req-003 | Éxito |
| Negativa | GET /api/tasks | Atlas no disponible | 503 | 503 | req-004 | Éxito |
| Regresión | PATCH /api/tasks/:id/complete | sin cuerpo | 200 | 200 | [OCULTO] | Éxito |

## Evidencias
1. Compilación correcta mediante `pnpm check` y `pnpm build`.
2. Documento actualizado reflejando cambios en MongoDB Atlas.
3. Respuesta HTTP 204 sin cuerpo en operación DELETE.
4. Respuesta uniforme de errores con `requestId` e `issues` detallados.
5. Verificación de persistencia tras reinicio del proceso Node.js.