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

// Password reset schema
export const passwordResetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  newPassword: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
});

// Infer the type for password reset
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;

// Update profile schema
export const userProfileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).optional(),
});

// Infer the type for profile update
export type UserProfileUpdateInput = z.infer<typeof userProfileUpdateSchema>;
