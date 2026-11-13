# Reflexión sobre CRUD Persistente en MongoDB

# 1. ¿Qué operación de Mongoose corresponde a cada letra de CRUD?
-Create (C): `TaskModel.create()`
-Read (R): `TaskModel.find()` y `TaskModel.findById()`
-Update (U): `TaskModel.findByIdAndUpdate()`
-Delete (D): `TaskModel.findByIdAndDelete()`

# 2. ¿Por qué se usa PATCH y no un reemplazo completo del documento?
Se utiliza `PATCH` porque permite realizar actualizaciones parciales en las cuales el cliente solo envía los campos que desea modificar (por ejemplo, solo `title` o solo `status`), manteniendo intactos los valores previos de los campos no incluidos en la solicitud. `PUT`, en cambio, implicaría reemplazar todo el documento.

# 3. ¿Qué problema evita `$set`?
El operador `$set` de MongoDB evita la sobrescritura total del documento, garantizando que únicamente se modifiquen las claves especificadas en el objeto de cambios sin alterar los demás atributos guardados en la base de datos.

# 4. ¿Qué efecto tienen `new: true` y `runValidators: true`?
-`new: true`: Le indica a Mongoose que devuelva el documento **después** de haber aplicado la actualización (en lugar de retornar la versión anterior al cambio).

-`runValidators: true`: Asegura que Mongoose aplique las reglas de validación definidas en el esquema (como límites de longitud o valores permitidos de `enum`) durante la ejecución del update.

# 5. ¿Por qué un cuerpo vacío debe rechazarse?
Un cuerpo vacío (`{}`) en una solicitud `PATCH` debe rechazarse con un código `422 Unprocessable Entity` porque no contiene ninguna instrucción de cambio. Procesarlo consumiría recursos innecesarios en la base de datos sin aportar ninguna modificación real.

# 6. ¿Qué diferencia existe entre `INVALID_ID` y `TASK_NOT_FOUND`?
-`INVALID_ID` (400 Bad Request): El formato del identificador proporcionado en la URL no cumple con la sintaxis de un `ObjectId` de MongoDB (debe ser una cadena de 24 caracteres hexadecimales).

-`TASK_NOT_FOUND` (404 Not Found): El ID tiene una sintaxis válida de `ObjectId`, pero no existe ningún documento registrado con ese ID en la colección.

# 7. ¿Qué responsabilidad cumple `validateTaskUpdate` y cuál cumple `TaskModel`?
-`validateTaskUpdate`: Valida la entrada HTTP a nivel de aplicación (comprueba que sea un objeto JSON, rechaza campos desconocidos, valida tipos y prepara el objeto `TaskUpdate`).

-`TaskModel`:** Aplica la validación a nivel de persistencia en la base de datos como última línea de defensa mediante la configuración del esquema y `runValidators: true`.

# 8. ¿Cómo llega un error de `updateTask` al `errorHandler` de Express 5?
En Express 5, cuando una función asíncrona dentro de un controlador lanza una excepción (como `AppError`), la promesa rechazada es capturada automáticamente por el framework y transmitida al middleware central de errores (`errorHandler`) sin necesidad de bloques `try/catch` explícitos.

# 9. ¿Por qué DELETE responde 204 sin cuerpo?
El código HTTP `204 No Content` es el estándar para operaciones exitosas de eliminación donde no es necesario devolver ninguna representación de datos en la respuesta.

# 10. ¿Qué prueba demuestra que el CRUD es persistente y no solo funcional en memoria?
Reiniciar completamente la aplicación Node.js (deteniendo la ejecución y volviéndola a iniciar con `pnpm dev`) y comprobar mediante una consulta `GET` que las modificaciones realizadas con `PATCH` siguen guardadas en MongoDB Atlas.