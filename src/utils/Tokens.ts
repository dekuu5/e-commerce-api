import { log } from 'console';
import jwt from 'jsonwebtoken';
import { redisClient } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refreshsecret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '15m';
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';

// Generate Access Token
export function generateAccessToken(userId: number, email: string): string {
    log("Generating access token");
    const accessToken = jwt.sign(
        { id: userId, email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
    );
    return accessToken;
}

// Generate Refresh Token
export function generateRefreshToken(userId: number, email: string): string {
    log("Generating refresh token");
    const refreshToken = jwt.sign(
        { id: userId, email },
        JWT_REFRESH_SECRET,
        { expiresIn: JWT_REFRESH_EXPIRATION }
    );
    return refreshToken;
}

export async function verifyRefreshToken(refreshToken: string): Promise<{ id: number; email: string } | null> {
    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: number; email: string };
        const storedToken = await redisClient.get(decoded.id.toString());

        if (storedToken !== refreshToken) {
            return null;
        }

        return { id: decoded.id, email: decoded.email };
    } catch (error) {
        return null;
    }
}