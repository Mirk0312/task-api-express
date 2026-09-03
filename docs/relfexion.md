# Reflexión — EC1 F1 A2

**Nombre:** Karim Erubiel Miranda De los reyes  
**Grupo:** 001  


## 1.- ¿Cuál es la función de Node.js en este proyecto?

Node.js es el entorno que ejecuta JavaScript fuera del navegador. En este proyecto nos permite correr el código del backend desde la terminal y leer variables del sistema como APP_NAME.

## 2.- ¿Qué errores ayuda a detectar TypeScript antes de ejecutar la aplicación?

TypeScript detecta errores de código antes de ejecutar la aplicación. Nos avisa si pasamos datos del tipo incorrecto (como un texto en lugar de un número en el id), si intentamos usar propiedades que no existen en una tarea o si olvidamos retornar un valor en una función.

## 3. Por qué se separaron models, data, services y utils?

Separa el código por responsabilidades para que sea limpio, fácil de mantener y escalar:

-models: Define la estructura de las tareas (Task).
-data: Guarda el arreglo de datos inicial.
-services: Contiene la lógica del programa (createTask, deleteTask).
-utils: Almacena funciones de apoyo reutilizables (delay, env).

## 4. Qué diferencia existe entre una función síncrona y una función async?
La síncrona ejecuta el código paso a paso y detiene todo hasta terminar (como deleteTask). La asíncrona (async) trabaja en segundo plano sin congelar el programa y usa await para esperar el resultado (como delay o main).

## 5.- Por qué findTaskById devuelve Task | undefined?
Devuelve una unión de tipos (`Task | undefined`) porque al buscar un objeto dentro de un arreglo mediante un `id`, existe la posibilidad de que el id solicitado no exista. Retornar `undefined` fuerza al desarrollador a manejar el caso en que la tarea no sea encontrada antes de intentar acceder a sus propiedades, evitando errores de tipo `Null Pointer / Cannot read property of undefined`.

## 6.- Qué ventaja aporta leer APP_NAME desde process.env?
Nos permite cambiar configuraciones de la aplicación (como nombres o puertos) sin modificar el código fuente. Esto facilita ejecutar el proyecto en diferentes entornos (desarrollo, pruebas o producción) usando simplemente variables de configuración externas.

## 7.- Qué diferencia observó entre pnpm start y la secuencia pnpm build + pnpm serve

-pnpm dev / pnpm start: Ejecuta el código TypeScript al instante en memoria para desarrollar y probar rápido mientras programamos.

-pnpm build + pnpm serve: Es el flujo para producción. build traduce el código TypeScript a JavaScript en la carpeta dist/, y serve ejecuta ese archivo traducido directamente con Node.js.

## 8. Qué parte de este proyecto podrá reutilizarse cuando se construya la API con Express?
Todo el código de models/, services/ y utils/ se reutiliza por completo. Solamente se reemplazaría el archivo index.ts (que corre en la terminal) por rutas de Express o Fastify que respondan a peticiones HTTP.
