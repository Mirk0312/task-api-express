# Reflexión sobre integración de MongoDB Atlas

### 1. ¿Qué diferencia existe entre tu cuenta de Atlas y el usuario de base de datos?
La cuenta de Atlas es la cuenta de administrador global para gestionar proyectos, clústeres, facturación y configuraciones de red. El usuario de base de datos (`api-task-user`) es una credencial de aplicación creada exclusivamente para que la API interactúe con los datos mediante permisos limitados (ej. `readWrite`).

### 2. ¿Por qué MONGODB_URI se considera un secreto aunque el repositorio sea privado?
Porque la URI contiene el usuario, la contraseña y la dirección del servidor de la base de datos. Si el repositorio o un commit privado llega a filtrarse, cualquier persona podría borrar o manipular la base de datos de producción/desarrollo.

### 3. ¿Qué riesgo introduce permitir 0.0.0.0/0 en la lista de acceso?
Permite que cualquier dispositivo desde cualquier lugar del mundo intente conectarse al clúster si conoce las credenciales, lo que aumenta la exposición a ataques de fuerza bruta.

### 4. ¿Por qué la API espera connectDatabase antes de ejecutar app.listen?
Para garantizar que la infraestructura de datos esté lista antes de aceptar peticiones HTTP. Si el puerto se abriera antes, las peticiones entrantes fallarían al intentar consultar la base de datos.

### 5. ¿Qué comprueba readyState y qué añade el comando ping?
`readyState` verifica el estado interno del cliente local de Mongoose (si está conectando, conectado, desconectando o desconectado), mientras que el comando `ping` envía una petición real a la base de datos de Atlas para confirmar que el servidor remoto responde.

### 6. ¿Por qué una falla de MongoDB corresponde a infraestructura y no a validación HTTP?
Porque es un problema de conectividad o disponibilidad de servicios externos (red, base de datos caerse o credenciales erróneas) y no un error en el formato de los datos enviados por el cliente.

### 7. ¿Cómo llega un AppError lanzado por getDatabaseHealth al manejador central en Express 5?
En Express 5, las promesas rechazadas en manejadores asíncronos (`async/await`) se capturan automáticamente y se pasan al middleware de manejo de errores global (middleware de 4 parámetros `(err, req, res, next)`).

### 8. ¿Qué pruebas demuestran que la incorporación de Atlas no rompió la API anterior?
Las pruebas de regresión (los endpoints `/api/tasks`, `/api/tasks/:id`, etc.), ya que siguen respondiendo con los mismos formatos y códigos HTTP esperados (200, 201, 204, 400, 404).

### 9. ¿Por qué el arreglo en memoria se conserva todavía en esta actividad?
Porque la actividad estuvo enfocada únicamente en establecer la infraestructura y conectividad con el clúster de Atlas y el módulo de salud (`/health/database`), sirviendo como paso previo al modelado de datos persistentes.

### 10. ¿Qué información debe ocultarse al cliente cuando ocurre un error de conexión?
Deben ocultarse la cadena de conexión (`MONGODB_URI`), usuarios, contraseñas, IPs, nombres de host y la pila de llamadas del sistema (*stack trace*). Se le debe devolver únicamente un mensaje genérico e inofensivo como "Error interno del servidor" o "No fue posible conectar con la base de datos".