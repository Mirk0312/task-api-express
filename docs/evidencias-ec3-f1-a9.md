# Evidencias EC3 F1 A9

## Datos generales
- Nombre: Miranda De los reyes Karim
- Grupo: 001
- Repositorio y rama: task-api-express (rama: ec3-a9-auth)
- Commit final: feat: implementa contraseñas y tokens jwt / expone registro e inicio de sesión

## Entorno verificado
- `node --version`: v20.19.0 o superior
- `pnpm --version`: v11.x
- `pnpm check`: aprobado
- `pnpm build`: aprobado
- `GET /health/database`: código 200, status up

## Registro
- Solicitud utilizada (con contraseña oculta):
  ```json
  {
    "name": "Ana Torres",
    "email": "ana.torres@example.com",
    "password": "<OCULTA>"
  }

## Inicio de sesion
{
  "email": "ana.torres@example.com",
  "password": "<OCULTA>"
}
Código HTTP: 200 OK

Campos recibidos; reemplaza el token por <TOKEN_OCULTO>:

JSON
{
  "status": "success",
  "data": {
    "user": { "id": "...", "name": "Ana Torres", "email": "ana.torres@example.com", "role": "user" },
    "accessToken": "<TOKEN_OCULTO>",
    "tokenType": "Bearer",
    "expiresIn": "1h"
  }
}
Claims observados sin copiar el token: sub (ID de usuario), role (user), emisor (iss: task-api-express) y audiencia (aud: task-api-client).

        Caso             |Código esperado | Código obtenido |error.code             | Resultado
Correo repetido          | 409            |  409            |USER_EMAIL_EXISTS      | Aprobado
Contraseña corta         | 422            |  422            | AUTH_VALIDATION_ERROR | Aprobado
Campo role               | 422            |  422            | AUTH_VALIDATION_ERROR | Aprobado
Credenciales incorrectas | 401            |  401            | INVALID_CREDENTIALS   |Aprobado
Content-Type incorrecto  | 415            |  415            |UNSUPPORTED_MEDIA_TYPE | Aprobado
JSON inválido            | 400            |  400            |INVALID_JSON           |Aprobado

## Regresion de tareas
Crear: 201 Created (rutas de tareas públicas temporalmente en A9).

Listar con paginación y filtros: 200 OK con metadatos de paginación correctos.

Actualizar: 200 OK.

Completar: 200 OK.

Eliminar: 204 No Content.

## Seguridad Observada
*¿La colección guarda password o solo passwordHash?* Solo guarda el hash adaptativo cifrado con bcryptjs.

*¿Alguna respuesta expone passwordHash, URI, secreto o stack trace?* No, ninguna respuesta filtra información sensible ni trazas del sistema.

*¿El cliente puede asignarse admin?* No, los campos no permitidos son descartados por el middleware y el rol se fija por defecto en user.

## Conclusion
Se comprobó satisfactoriamente el funcionamiento del módulo de autenticación, el cifrado de contraseñas, la emisión segura de tokens JWT y la estabilidad ante casos de error controlado. Quedará pendiente para la Actividad 10 (A10) la incorporación del middleware de autenticación para proteger y restringir el acceso a las rutas del CRUD de tareas mediante el uso del token JWT y control de roles.