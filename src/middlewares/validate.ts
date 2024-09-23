import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import logger from '../utils/logger.js';  // Assuming you have a logger setup

// Middleware for validating request data using a Zod schema
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body (you can also validate params or query)
      schema.parse(req.body);
      next();  // Proceed to the next middleware or controller
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract validation errors
        const validationErrors = error.errors.map((err) => err.message);
        logger.error(`Validation error: ${validationErrors}`);
        return res.status(400).json({ errors: validationErrors });
      }
      // If an unexpected error occurs
      logger.error(`Unexpected error: ${(error as any).message}`);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};
