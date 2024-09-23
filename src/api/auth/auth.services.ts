import { UserRegisterInput,PasswordResetInput, UserLoginInput } from "../../validators/userValidator.js";
import {prisma} from "../../db.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/Tokens.js";
import { storeRefreshToken, removeRefreshToken } from '../../utils/refreshTokenManager.js';
import { User } from '@prisma/client';
import { log } from "console";

export async function registerService(userData: UserRegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: 'USER'
        }
    });

    return newUser;
}





export async function loginService(userData: UserLoginInput) {
    console.log("Starting loginService");

    // Validate user credentials
    const user: User | null = await prisma.user.findUnique({
        where: { 
            email: userData.email
        }
    });
    console.log("User fetched from database:", user);
    
    if (!user || !await bcrypt.compare(userData.password, user.password)) {
        console.error("Invalid credentials");
        throw new Error('Invalid credentials2');
    }
    console.log("Password validated");

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);
    console.log("Tokens generated:", { accessToken, refreshToken });

    // Store refresh token in Redis
    try {
        await storeRefreshToken(user.id, refreshToken);
        console.log("Refresh token stored in Redis");
    } catch (error) {
        console.error("Error storing refresh token in Redis:", error);
        throw new Error("Failed to store refresh token");
    }

    console.log("Returning tokens");
    return { accessToken, refreshToken };
}

export async function signOutService(userId: number) {
    log("signOutService - Removing refresh token for user:", userId);
    try {
        await removeRefreshToken(userId);
        log("signOutService - Refresh token removed successfully");
    } catch (error) {
        log("signOutService - Error removing refresh token:", error);
        throw new Error("Failed to remove refresh token");
    }
}