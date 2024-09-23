import { z } from 'zod';

// Define the category schema
const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
});

// Define the TypeScript type for the category schema
type Category = z.infer<typeof categorySchema>;

export { categorySchema, Category };