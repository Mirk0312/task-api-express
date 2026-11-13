# Reflexión sobre Modelado y Persistencia en MongoDB

### 1. ¿Qué diferencia existe entre un documento, un esquema y un modelo?
*-Esquema (Schema):* Es la estructura y definición de reglas en TypeScript/Mongoose que especifica qué campos tiene la entidad, sus tipos de datos, validaciones y valores por defecto.

*-Modelo (Model):* Es la clase construida a partir del esquema. Funciona como la interfaz de programación (ORM/ODM) que permite interactuar con la base de datos para realizar operaciones CRUD (`find`, `create`, `findByIdAndUpdate`, etc.).

*-Documento (Document):* Es una instancia individual de un modelo que representa un registro concreto de datos guardado dentro de una colección en MongoDB (en formato BSON).

### 2. ¿Por qué la API devuelve `id` en lugar de `_id`?
MongoDB utiliza por defecto la clave primaria `_id` de tipo `ObjectId`. Sin embargo, para desacoplar el contrato HTTP público de los detalles de implementación de la base de datos (y mantener compatibilidad con el estándar REST de la aplicación), el servicio transforma el campo `_id` a una cadena simple `id` en la función de mapeo (`toTask`), omitiendo además campos internos de Mongoose como `__v`.

### 3. ¿Qué problema evita migrar todas las operaciones a una sola fuente de datos?
Evita inconsistencias de datos, condiciones de carrera (*race conditions*) y pérdida de información. Al tener una única fuente de datos persistente (MongoDB Atlas), evitamos tener datos volátiles en memoria en arreglos locales que se destruyen al reiniciar el servidor o cuando coexisten múltiples instancias de la aplicación.

### 4. ¿Qué reglas aplica el middleware y cuáles repite el esquema?
*-Middleware HTTP:* Valida la entrada antes de llegar al servicio (formato del JSON, presencia de campos obligatorios en el body como `title`, extensión mínima/máxima de cadenas y validez del `ObjectId` en el parámetro `:id`).

*-Esquema de Mongoose:* Actúa como la última línea de defensa a nivel de persistencia, definiendo tipos, re-verificando requerimientos (`required: true`), valores por defecto (como `status: 'pending'`), límites de longitud y limpieza de espacios en blanco (`trim: true`).

### 5. ¿Qué diferencia existe entre `INVALID_ID` y `TASK_NOT_FOUND`?
*-`INVALID_ID` (Error 400 - Bad Request):* Se dispara en el middleware cuando la sintaxis o formato del ID ingresado no corresponde a un `ObjectId` válido de 24 caracteres hexadecimales (ej. `/api/tasks/1`).

*-`TASK_NOT_FOUND` (Error 404 - Not Found):* Se dispara en el servicio cuando el ID sí posee una estructura de `ObjectId` válida, pero no existe ningún documento registrado con ese identificador en la base de datos.

### 6. ¿Qué hacen `timestamps` y `versionKey: false`?
*-`timestamps: true`:* Le indica a Mongoose que gestione automáticamente los campos `createdAt` y `updatedAt`, registrando la fecha y hora exacta de creación y última modificación de la tarea.

*-`versionKey: false`:* Desactiva la creación del campo de control de versiones `__v` que Mongoose agrega automáticamente a los documentos.

### 7. ¿Por qué los controladores deben usar `async/await`?
Porque todas las operaciones hacia la base de datos (I/O) en Node.js y Mongoose son asíncronas y retornan Promesas. `async/await` permite pausar la ejecución del controlador hasta que la base de datos responda, manejando el flujo de manera limpia y permitiendo capturar cualquier error asíncrono para enviarlo al middleware global.

### 8. ¿Cómo llega un `AppError` asíncrono al `errorHandler` de Express 5?
En Express 5, las promesas rechazadas en controladores asíncronos se capturan automáticamente y se transmiten al siguiente middleware de manejo de errores (`next(error)`) sin necesidad de bloques `try/catch` explícitos o envoltorios adicionales. Al ser lanzado un `AppError`, este llega directamente al `errorHandler` manteniendo su código de estado, mensaje y `requestId`.

### 9. ¿Qué prueba demuestra realmente que una tarea es persistente?
Reiniciar completamente el proceso de Node.js (detener el servidor con `Ctrl+C` y volver a ejecutar `pnpm dev`) y comprobar que la tarea creada previamente mediante un `POST` sigue siendo recuperable y consultable mediante un `GET /api/tasks`.

### 10. ¿Qué información de Mongoose o Atlas nunca debe aparecer en la respuesta HTTP?
Nunca deben exponerse la URI de conexión (que contiene usuario, contraseña y cluster de Atlas), *stack traces* de errores internos, rutas de directorios locales o excepciones brutas producidas por la base de datos. En su lugar, el backend debe capturar dichos errores y responder únicamente con un formato JSON estandarizado que contenga un código genérico, mensaje comprensible y el `requestId`.