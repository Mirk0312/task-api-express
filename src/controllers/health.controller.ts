import type { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    data: {
      status: 'up'
    }
  });
};

export const getDatabaseHealth = async (_req: Request, res: Response): Promise<void> => {
  const state = mongoose.connection.readyState;
  const isConnected = state === 1;
  res.status(isConnected ? 200 : 503).json({
    data: {
      status: isConnected ? 'connected' : 'disconnected',
      readyState: state
    }
  });
};