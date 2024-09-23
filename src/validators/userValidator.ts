import { z } from 'zod';

// Enum for user roles
export const RoleEnum = z.enum(['USER', 'ADMIN']);

// User registration schema
export const userRegisterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
});

// Infer the TypeScript type from the schema
export type UserRegisterInput = z.infer<typeof userRegisterSchema>;

// Login schema
export const userLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});

// Infer the type for login
export type UserLoginInput = z.infer<typeof userLoginSchema>;



// Update profile schema
export const userProfileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).optional(),
});

// Infer the type for profile update
export type UserProfileUpdateInput = z.infer<typeof userProfileUpdateSchema>;



// Create user schema
export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    role: z.enum(['USER', 'ADMIN']).optional(),
});

// Update user schema
export const updateUserSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    name: z.string().min(1).optional(),
    role: z.enum(['USER', 'ADMIN']).optional(),
});

// User ID schema
export const userIdSchema = z.object({
    id: z.number().int(),
});

// Password reset schema
export const passwordResetSchema = z.object({
    email: z.string().email(),
    newPassword: z.string().min(8),
});

// Infer the type for password reset
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;


// Address schema
export const addressSchema = z.object({
    addressLine1: z.string().min(1, { message: "Address Line 1 is required" }),
    addressLine2: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    postalCode: z.string().min(1, { message: "Postal Code is required" }),
    country: z.string().min(1, { message: "Country is required" }),
});

// Infer the type for address
export type AddressInput = z.infer<typeof addressSchema>;