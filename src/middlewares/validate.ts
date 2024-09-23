import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import logger from '../utils/logger.js';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next(); 
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => err.message);
        logger.error(`Validation error: ${validationErrors}`);
        return res.status(400).json({ errors: validationErrors });
      }
      logger.error(`Unexpected error: ${(error as any).message}`);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};
