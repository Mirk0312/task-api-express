# Preguntas de cierre - Validación y Errores

1. **¿Qué diferencia existe entre validar el formato HTTP y proteger una regla del negocio?**
   Validar el formato HTTP (en middlewares como `requireJson` o `validateTaskTitle`) revisa que la información recibida tenga la estructura correcta, por ejemplo, que sea un texto o que tenga los encabezados necesarios. Proteger reglas de negocio (en la capa de servicio como `task.service.ts`) verifica que los datos cumplan con las condiciones que necesita la aplicación, como comprobar que exista un ID antes de realizar una operación.

2. **¿Por qué conviene usar router.param para validar el id?**
Permite validar el parámetro `:id` una sola vez y de manera centralizada para todas las rutas del módulo (`GET /:id`, `PATCH /:id/complete` y `DELETE /:id`). Así se evita repetir el mismo código en cada controlador.


3. **¿Qué ventaja ofrece guardar datos normalizados en res.locals?**
Permite guardar los datos ya revisados y limpios, como res.locals.taskId o res.locals.taskTitle, para que el controlador pueda usarlos directamente sin tener que validarlos o convertirlos otra vez.

4. **¿Cuándo corresponde responder 400 y cuándo 422?**
Se usa 400 Bad Request cuando la solicitud está mal formada, por ejemplo, si el JSON tiene errores o el ID no es un número. En cambio, 422 Unprocessable Entity se usa cuando la solicitud está bien formada, pero los datos no cumplen con las reglas de validación, como un título vacío o un valor que no es booleano.

5. **¿Por qué notFound delega el error en lugar de responder directamente?**
  Porque crea un AppError y lo envía con next(error) al errorHandler. De esta forma, todos los errores se manejan de manera uniforme y las respuestas incluyen información como el requestId.

6. **¿Qué información no debe enviarse al cliente en un error 500?**
 No se deben mostrar detalles internos, como nombres de variables, librerías o errores de la base de datos. Lo mejor es mostrar un mensaje general para evitar problemas de seguridad.

7. **¿Cómo ayuda requestId durante la depuración?**
   Genera un identificador único para cada petición. Este identificador aparece tanto en la respuesta como en los registros del servidor, lo que facilita encontrar qué petición causó un error.

8. **¿Qué prueba demuestra que la refactorización no rompió la API anterior?**
  Se pueden realizar pruebas de regresión en Postman, por ejemplo, con GET /api/tasks y DELETE /api/tasks/1, comprobando que siguen funcionando y devuelven los códigos esperados, como 200 OK y 204 No Content.