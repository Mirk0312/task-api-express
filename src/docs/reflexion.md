# Reflexión sobre la construcción de la API REST

1. **¿Qué responsabilidad cumple Express y qué responsabilidad conserva el servicio?**
   Express administra la infraestructura HTTP (recepción de peticiones, enrutamiento, controladores y respuestas JSON). El servicio mantiene de forma independiente la lógica de negocio y las reglas de manipulación de datos.

2. **¿Por qué no conviene escribir toda la lógica dentro de `task.routes.ts`?**
   Porque rompería el principio de separación de responsabilidades, acoplando el enrutamiento con la lógica de negocio y dificultando el mantenimiento y las pruebas del software.

3. **¿Qué diferencia existe entre `req.params` y `req.body`?**
   `req.params` captura variables especificadas en la URL de la petición (como el ID del recurso), mientras que `req.body` contiene el cuerpo JSON enviado dentro del mensaje HTTP (como el objeto enviado para crear un recurso).

4. **¿Por qué el título recibido desde un cliente se considera `unknown` antes de validarlo?**
   Porque los datos externos no son seguros por defecto. El tipo `unknown` obliga a validar mediante código el tipo de dato recibido antes de realizar operaciones con él.

5. **¿Qué ventaja ofrece centralizar los errores en un middleware?**
   Estandariza la estructura de las respuestas de error JSON en toda la API y evita la duplicación de código en los controladores.

6. **¿Cuándo debe utilizarse 201 en lugar de 200?**
   El código `201 Created` se utiliza específicamente cuando una petición resulta en la creación exitosa de un nuevo recurso, mientras que `200 OK` se usa para operaciones de lectura o actualización.

7. **¿Por qué DELETE responde 204 sin un objeto JSON?**
   Por estándar HTTP, el código `204 No Content` indica que la acción fue exitosa pero que no hay ningún contenido adicional que retornar en el cuerpo de la respuesta.

8. **¿Qué ocurrirá con las tareas cuando el servidor se reinicie y por qué?**
   Las tareas volverán a su estado inicial definido en `src/data/tasks.ts`, ya que la información se almacena temporalmente en la memoria RAM del proceso[cite: 1].

9. **¿Qué archivos podrán conservarse cuando se incorpore MongoDB Atlas?**
   Se conservarán los controladores, rutas, middlewares e interfaces. Solo se modificará la capa de datos/servicios para interactuar con la base de datos en lugar de arreglos locales.