# Pruebas de validación y errores

| Caso | Método y ruta              | Datos enviados         | Esperado                   | Obtenido| requestId | Resultado 
 
|    1 | GET `/api/tasks`           | Sin cuerpo             | 200 OK                     | 200     | Coincide  | Aprobado 
|    2 | GET `/api/tasks/abc`       | Sin cuerpo             | 400 INVALID_ID             | 400     | Coincide  | Aprobado 
|    3 | GET `/api/tasks/999`       | Sin cuerpo             | 404 TASK_NOT_FOUND         | 404     | Coincide  | Aprobado 
|    4 | POST `/api/tasks`          | `{"title": "Prueba"}`  | 201 Created                | 201     | Coincide  | Aprobado 
|    5 | POST `/api/tasks`          | Sin Content-Type JSON  | 415 UNSUPPORTED_MEDIA_TYPE | 415     | Coincide  | Aprobado 
|    6 | POST `/api/tasks`          | `{"title": ""}`        | 422 VALIDATION_ERROR       | 422     | Coincide  | Aprobado 
|    7 | POST `/api/tasks`          | `{"title": 25}`        | 422 VALIDATION_ERROR       | 422     | Coincide  | Aprobado 
|    8 | POST `/api/tasks`          |   JSON malformado      | 400 INVALID_JSON           | 400     | Coincide  | Aprobado 
|    9 | GET `/ruta-falsa`          | Sin cuerpo             | 404 ROUTE_NOT_FOUND        | 404     | Coincide  | Aprobado 
|   10 | GET `/debug/error`         | Sin cuerpo             | 500 INTERNAL_ERROR         | 500     | Coincide  | Aprobado 
| De 1 | PATCH `/api/tasks/1/status`| `{"completed": true}`  | 200 OK                     | 200     | Coincide  | Aprobado
| De 2 | PATCH `/api/tasks/1/status`| `{"completed": "si"}`  | 422 VALIDATION_ERROR       | 422     | Coincide  | Aprobado 
| De 3 | PATCH `/api/tasks/5/status`| `{"completed": true}`  | 404 TASK_NOT_FOUND         | 404     | Coincide  | Aprobado 