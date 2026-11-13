# Preguntas de Cierre - EC3 F2 A11

1. **¿Qué parte de la aplicación se reemplaza con dobles en api.test.ts y qué parte sigue siendo real?**
   En las pruebas de integración con dobles (mocks), se suelen simular o aislar las dependencias externas (como servicios de terceros o bases de datos si se usa una capa in-memory), mientras que la lógica del controlador, los middlewares de autenticación y las rutas de Express siguen ejecutándose de forma real para validar el flujo de la petición.

2. **¿Por qué una suite aprobada no demuestra que MongoDB Atlas esté configurado correctamente?**
   Porque una suite de pruebas puede utilizar una base de datos en memoria (como Memory Server) o mocks locales para pasar con éxito de forma aislada, lo cual no garantiza que las credenciales, la red (IP whitelist) y la conexión real con el clúster remoto en MongoDB Atlas estén operativas.

3. **¿Qué diferencia existe entre OpenAPI y Swagger UI?**
   OpenAPI es la especificación estándar (el contrato formal en JSON/YAML) que describe la estructura, rutas y esquemas de la API, mientras que Swagger UI es la herramienta visual e interactiva que lee esa especificación para generar la interfaz web donde se puede probar la API.

4. **¿Por qué GET /api/auth/me obtiene el id desde el token y no desde params o body?**
   Por seguridad e identidad. El token JWT firmado verifica quién es el usuario autenticado de forma confiable; si se aceptara el ID por parámetros o el body, cualquier usuario malintencionado podria consultar los datos de perfil de otra persona simplemente cambiando el ID en la URL.

5. **¿Por qué authRateLimiter ya no se monta en todo authRouter?**
   Porque limitar drásticamente con un rate limiter todas las rutas del router de autenticación puede bloquear peticiones legítimas y necesarias (como verificar el token en `/me` repetidas veces al recargar la interfaz), restringiéndose únicamente a rutas críticas y sensibles como el login o registro para evitar ataques de fuerza bruta.

6. **¿Qué diferencia hay entre un error 401 y un 403 en el cliente?**
   El error `401 Unauthorized` indica que el usuario no está autenticado (falta el token o es inválido, por lo que el cliente debe redirigir al login), mientras que el `403 Forbidden` indica que el usuario sí está autenticado pero no tiene los privilegios o roles necesarios para acceder a ese recurso.

7. **¿Por qué Postman puede funcionar aunque el navegador informe CORS?**
   Porque CORS (Cross-Origin Resource Sharing) es una medida de seguridad exclusiva implementada y aplicada por los **navegadores web** para proteger al usuario de scripts maliciosos en sitios cruzados. Postman es una aplicación de escritorio independiente y cliente de API puro, por lo que no ejecuta un navegador ni respeta las restricciones de políticas CORS.

8. **¿Qué riesgo conserva sessionStorage y por qué se usa solo como solución didáctica?**
   Almacenar tokens o credenciales en `sessionStorage` expone la información a ataques de tipo XSS (Cross-Site Scripting), ya que cualquier script malicioso o dependencia vulnerable inyectada en el cliente puede leer fácilmente esos datos. En entornos de producción reales se prefieren cookies HttpOnly y Secure.

9. **¿Qué contrato comparten openapi.ts, types.ts y las respuestas reales?**
   Comparten los tipos de datos y esquemas estructurales (las interfaces de TypeScript y modelos de negocio), asegurando que lo que documenta OpenAPI, lo que tipifica TypeScript y lo que el backend responde en tiempo de ejecución coincidan exactamente sin discrepancias.

10. **¿Qué prueba agregarías primero antes de desplegar la actividad 12 y por qué?**
    Una prueba integral de salud y conectividad (`/api/health` junto con la verificación de conexión a MongoDB Atlas), porque es el punto crítico para asegurar que el servidor no solo arranca, sino que puede comunicarse con su persistencia antes de recibir tráfico de usuarios.