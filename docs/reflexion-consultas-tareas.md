# Reflexión sobre Arquitectura, Paginación y Consultas

### 1. ¿Qué responsabilidad nueva cumple `task.repository.ts`?
Centraliza y aísla toda la lógica de acceso a datos y comunicación directa con Mongoose (`TaskModel`), transformando las consultas tipadas en llamadas a la base de datos y estandarizando el manejo de errores de persistencia.

### 2. ¿Por qué el middleware debe validar `req.query` antes del controlador?
Porque garantiza que la entrada del cliente sea segura y cumpla con el formato esperado antes de consumir recursos de la lógica de negocio o de la base de datos, evitando que parámetros maliciosos o inválidos lleguen al servicio.

### 3. ¿Cómo se calcula `skip` para una página determinada?
Se calcula con la fórmula `skip = (page - 1) * limit`, la cual determina cuántos documentos se deben omitir en la consulta a la base de datos según el número de página y el tamaño del límite por página.

### 4. ¿Por qué `find` y `countDocuments` deben usar el mismo filtro?
Para asegurar que el conteo total de documentos coincida exactamente con el subconjunto devuelto, garantizando que los metadatos de paginación (`totalPages`, `total`) sean coherentes con los datos filtrados.

### 5. ¿Qué problema evita `escapeRegex`?
Evita vulnerabilidades o errores de sintaxis al sanitizar los caracteres especiales introducidos por el usuario en el parámetro de búsqueda, asegurando que se interpreten como texto literal y no como operadores o patrones maliciosos de expresiones regulares.

### 6. ¿Por qué `sortBy` utiliza una lista permitida?
Impide ataques de inyección de campos u órdenes arbitrarios, restringiendo estrictamente los criterios de ordenamiento a un conjunto cerrado de propiedades válidas del esquema (`createdAt`, `updatedAt`, `title`, `status`).

### 7. ¿Qué diferencia existe entre `data.length`, `meta.total` y `meta.totalPages`?
- `data.length`: Cantidad de elementos devueltos en la página actual.
- `meta.total`: Número total de documentos que coinciden con los filtros en toda la colección.
- `meta.totalPages`: Cantidad total de páginas disponibles calculada a partir del total de documentos y el límite por página.

### 8. ¿Cómo llega un error asíncrono del repositorio al `errorHandler` de Express 5?
El error es capturado por la función envolvente del repositorio, convertido en un `AppError` seguro y propagado a través de las capas superiores mediante promesas rechazadas, las cuales son interceptadas automáticamente por Express 5 y enviadas al middleware central.

### 9. ¿Qué prueba demuestra que A8 no rompió el CRUD de A7?
La ejecución de las pruebas de regresión sobre las rutas de creación (`POST`), lectura por ID (`GET`), actualización parcial (`PATCH`), completado (`PATCH /complete`) y eliminación (`DELETE`), verificando que conservan sus códigos de estado y respuestas originales.

### 10. ¿Qué limitación tiene la paginación basada en `skip` cuando la colección crece mucho?
A medida que la paginación avanza hacia páginas muy lejanas, el rendimiento de MongoDB disminuye considerablemente porque el cursor debe recorrer y descartar todos los documentos anteriores (`skip`), por lo que en grandes volúmenes de datos se prefiere la paginación basada en cursores.