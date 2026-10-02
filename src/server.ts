import 'dotenv/config';


/*console.log('--- PRUEBA DE ENV ---');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('---------------------');
*/

import type { Server } from 'node:http';
import { app } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { loadEnvironment } from './config/env.js';

let server: Server | null = null;
let isShuttingDown = false;

const handleShutdown = async (signal: string): Promise<void> => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\nRecibida señal ${signal}. Cerrando servidor ordenadamente...`);

  if (server) {
    await new Promise<void>((resolve) => {
      server?.close(() => {
        console.log('Servidor HTTP cerrado.');
        resolve();
      });
    });
  }

  await disconnectDatabase();
  console.log('Conexión a MongoDB cerrada limpiamente.');

  setImmediate(() => {
    process.exit(0);
  });
};

const startServer = async (): Promise<void> => {
  try {
    const env = loadEnvironment();

    await connectDatabase({
      uri: env.mongodbUri,
      dbName: env.mongodbDbName
    });

    server = app.listen(env.port, () => {
      console.log(`API disponible en http://localhost:${env.port}`);
    });
  } catch {
    console.error(
      'No fue posible iniciar la API. Revise MONGODB_URI, ' +
        'el usuario y la lista de acceso de red.'
    );
    process.exitCode = 1;
  }
};

process.on('SIGINT', () => void handleShutdown('SIGINT'));
process.on('SIGTERM', () => void handleShutdown('SIGTERM'));

void startServer();