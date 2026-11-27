import cors, { type CorsOptions } from 'cors';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { env } from '../config/env.js';
import { AppError } from '../errors/app-error.js';

function getAllowedOrigins(): string[] {
  const fromEnv = (env.CORS_ORIGIN ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return Array.from(
    new Set([
      ...fromEnv,
      'http://localhost:5173',
      'https://task-manager-frontend-mirk0312.onrender.com',
    ]),
  );
}

const allowedOrigins = getAllowedOrigins();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Request-Id', 'RateLimit', 'RateLimit-Policy'],
  maxAge: 600,
};

export const securityHeaders = helmet();
export const documentationSecurityHeaders = helmet({
  contentSecurityPolicy: false,
});
export const corsPolicy = cors(corsOptions);
export const authRateLimiter = rateLimit({
  windowMs: env.AUTH_RATE_LIMIT_WINDOW_MS,
  limit: env.AUTH_RATE_LIMIT_MAX,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler(_req, _res, next) {
    next(
      new AppError(
        'Demasiados intentos de autenticación. Intenta más tarde.',
        429,
        'AUTH_RATE_LIMIT_EXCEEDED',
      ),
    );
  },
});