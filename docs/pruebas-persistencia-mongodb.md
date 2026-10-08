# Pruebas de modelado y persistencia

## Entorno
- **Rama:** feature/modelo-tareas-mongodb
- **Base:** task_api
- **Colección:** tasks
- **Resultado de pnpm check:** Correcto (sin errores de TypeScript)
- **Resultado de pnpm build:** Exitoso (generó dist/ sin errores)

## Documento comprobado
- **id devuelto por la API:** 6702a4b8e912f3456789abcd
- **Campos observados en Atlas:** `_id`, `title`, `description`, `status`, `createdAt`, `updatedAt`
- **Resultado después de reiniciar:** La tarea permanece accesible vía `GET /api/tasks/6702a4b8e912f3456789abcd` tras reiniciar la aplicación Node.js.

## Casos ejecutados

 Caso | Método y ruta                           | Datos               | Esperado                   | Obtenido                   | requestId   | Resultado 
  1   | GET /health/database                    | Sin cuerpo          | 200 connected              | 200 connected              | [OCULTO]    | Éxito 
  2   | POST /api/tasks                         | title + description | 201                        | 201                        | [OCULTO]    | Éxito 
  3   | GET /api/tasks                          | Sin cuerpo          | 200                        | 200                        | [OCULTO]    | Éxito 
  4   | GET /api/tasks/"taskId"                 | Sin cuerpo          | 200                        | 200                        | [OCULTO]    | Éxito 
  5   | Reinicio + GET /api/tasks               | Sin cuerpo          | 200                        | 200                        | [OCULTO]    | Éxito 
  6   | PATCH /api/tasks/"taskId"/complete      | Sin cuerpo          | 200 completed              | 200 completed              | [OCULTO]    | Éxito 
  7   | DELETE /api/tasks/"taskId"              | Sin cuerpo          | 204                        | 204                        | [OCULTO]    | Éxito 
  8   | GET /api/tasks/1                        | Sin cuerpo          | 400 INVALID_ID             | 400 INVALID_ID             | req-abc-001 | Éxito 
  9   | GET /api/tasks/6702a4b8e912f34567890000 | Sin cuerpo          | 404 TASK_NOT_FOUND         | 404 TASK_NOT_FOUND         | req-abc-002 | Éito 
  10  | POST /api/tasks                         | title vacío         | 422 VALIDATION_ERROR       | 422 VALIDATION_ERROR       | req-abc-003 | Éxito 
  11  | POST /api/tasks                         | raw Text            | 415 UNSUPPORTED_MEDIA_TYPE | 415 UNSUPPORTED_MEDIA_TYPE | req-abc-004 | Éxito 

## Evidencias
1. **Compilación correcta:** Comprobado mediante `pnpm check` y `pnpm build`.
2. **POST y documento visible en Atlas sin credenciales:** El documento fue insertado con `id` de 24 caracteres hexadecimales.
3. **Consulta después de reiniciar:** Se detuvo el servidor con `Ctrl+C`, se reinició con `pnpm dev` y los datos persistieron en MongoDB Atlas.
4. **Respuesta de errores uniformes:** Todos los errores respetan el contrato HTTP devolviendo `code`, `message` y `requestId` sin filtrar información sensible de la infraestructura o la cadena de conexión.