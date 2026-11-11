import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { isUserRole } from '../models/user.js';
import { setUserRoleByEmail } from '../repositories/user.repository.js';
const run = async (): Promise<void> => {
 const email = process.argv[2]?.trim().toLowerCase();
 const role = process.argv[3]?.trim();
 if (!email || !role || !isUserRole(role)) {
 throw new Error('Uso: pnpm role:set <correo> <user|admin>');
 }
await connectDatabase({
     uri: process.env.MONGODB_URI as string,
     dbName: process.env.MONGODB_DB_NAME as string
   });
try {
 await run();
} catch (error: unknown) {
 const message = error instanceof Error ? error.message : 'Error desconocido.';
 console.error(`No fue posible actualizar el rol. ${message}`);
 process.exitCode = 1;
} finally {
 await disconnectDatabase();
}
}