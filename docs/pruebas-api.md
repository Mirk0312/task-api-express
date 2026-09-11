# Pruebas de la API REST - Task API

| Orden | Método | Ruta                       | Código Esperado | Código Obtenido | Resultado |
|
| 1     |  GET   | `/api/tasks`               |       200       |      200        | Aprobado |
| 2     |  POST  | `/api/tasks` ("title"="")  |       201       |      201        | Aprobado |
| 3     |  GET   | `/api/tasks/3`             |       200       |      200        | Aprobado |
| 4     | PATCH  | `/api/tasks/3/complete`    |       200       |      200        | Aprobado |
| 5     | DELETE | `/api/tasks/3`             |       204       |      204        | Aprobado |
| 6     |  GET   | `/api/tasks/3`             |       404       |      404        | Aprobado |
