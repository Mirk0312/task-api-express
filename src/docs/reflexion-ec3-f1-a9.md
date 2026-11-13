# Reflexión y Preguntas de Cierre - EC3 F1 A9

1. **¿Por qué un hash de contraseña no debe poder descifrarse?**
   Porque la transformación unidireccional (hash) garantiza que, incluso si la base de datos es vulnerada, la contraseña original del usuario no pueda ser recuperada, evitando comprometer sus credenciales en otros servicios.

2. **¿Qué diferencia existe entre una sal aleatoria y la clave usada para firmar HS256?**
   La sal aleatoria es un valor único generado por cada usuario para evitar ataques de rainbow tables al hashear las contraseñas, mientras que la clave secreta (`JWT_SECRET`) es una firma criptográfica compartida por la API para validar la integridad y autenticidad del token emitido.

3. **¿Por qué `passwordHash` tiene `select: false` y aun así el login puede recuperarlo?**
   Porque `select: false` evita que el campo se devuelva por defecto en consultas rutinarias por seguridad, pero el repositorio puede anular esta restricción explícitamente mediante el método `select('+passwordHash')` cuando se necesita realizar la verificación de credenciales en el inicio de sesión.

4. **¿Por qué `unique` no sustituye la validación HTTP del correo?**
   Porque el índice único de MongoDB es un mecanismo de persistencia a nivel de base de datos para prevenir colisiones de datos ante solicitudes concurrentes, mientras que la validación HTTP comprueba el formato, el tipo y la estructura de los datos antes de que lleguen a la lógica de negocio, devolviendo un código de error claro y estructurado al cliente.

5. **¿Qué riesgo evita rechazar el campo `role` durante el registro?**
   Evita que usuarios malintencionados se autoasignen privilegios administrativos (`admin`) al registrarse en el sistema.

6. **¿Por qué correo inexistente y contraseña incorrecta devuelven el mismo mensaje?**
   Para evitar dar pistas a un atacante sobre qué correos están registrados en el sistema, mitigando ataques de enumeración de cuentas.

7. **¿Qué información contiene el JWT de esta actividad y qué información se excluye?**
   Contiene el identificador del usuario (`sub`) y su rol (`role`), además de los claims estándar (`iss`, `aud`, `exp`). Se excluye totalmente información sensible como contraseñas, hashes, nombres o correos.

8. **¿Qué validan `issuer`, `audience`, `algorithms` y `exp`?**
   Verifican que el token haya sido emitido por nuestra API (`issuer`), destinado al cliente correcto (`audience`), firmado con el algoritmo criptográfico esperado (`HS256`) y que no haya expirado en el tiempo (`exp`).

9. **¿Cómo llega un error de MongoDB desde el repositorio hasta `errorHandler` en Express 5?**
   El repositorio captura el error de Mongoose, lo mapea a un `AppError` controlado (como 409 o 503), el servicio y el controlador propagan la promesa rechazada, y Express 5 la intercepta automáticamente para enviarla al middleware central de errores.

10. **¿Por qué las rutas de tareas permanecen públicas en A9 y qué cambiará en A10?**
    Permanece públicas para asegurar la separación de fases y probar la regresión del CRUD. En A10 se incorporará el middleware de validación del token JWT para exigir autenticación y aplicar permisos por rol en las rutas protegidas.