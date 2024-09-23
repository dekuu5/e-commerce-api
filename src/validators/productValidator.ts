import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number'),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  categoryId: z.number().int().positive('Category ID must be a positive integer'),
});

export type Product = z.infer<typeof productSchema>;