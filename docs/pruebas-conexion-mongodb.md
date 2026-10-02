# Pruebas de conexión con MongoDB Atlas

## Entorno verificado
- Rama: feature/validacion-errores
- Comando de tipos: pnpm check
- Comando de compilación: pnpm build
- Resultado de arranque: conexión establecida sin mostrar credenciales

## Casos ejecutados

| Tipo | Método y ruta | Datos | Esperado | Obtenido | requestId | Resultado |
|---|---|---|---|---|---|---|
| Positiva | GET /health | No aplica | 200 | 200 | req-01 | Exitoso |
| Positiva | GET /health/database | No aplica | 200 connected | 200 connected | req-02 | Exitoso |
| Regresión | GET /api/tasks | No aplica | 200 | 200 | req-03 | Exitoso |
| Regresión | POST /api/tasks | title válido | 201 | 201 | req-04 | Exitoso |
| Negativa | GET /api/tasks/abc | No aplica | 400 INVALID_ID | 400 INVALID_ID | req-05 | Exitoso |
| Negativa | POST /api/tasks | raw Text | 415 UNSUPPORTED_MEDIA_TYPE | 415 UNSUPPORTED_MEDIA_TYPE | req-06 | Exitoso |
| Infraestructura | Reinicio con contraseña temporalmente incorrecta | No aplica | API no escucha | API no escucha | No aplica | Exitoso |

## Evidencias
1. Captura del despliegue disponible sin mostrar usuarios ni credenciales.
2. Captura de GET /health/database.
3. Capturas de una prueba correcta, una validación y una regla del negocio.
4. Evidencia de pnpm check y pnpm build.
5. Resultado de git check-ignore .env.