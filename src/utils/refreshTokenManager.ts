import { log } from 'console';
import { redisClient } from '../db.js';



export async function storeRefreshToken(userId: number, refreshToken: string): Promise<void> {
    log("Storing refresh token in Redis");
    try {
       
        redisClient.setEx(userId.toString(), 60 * 60 * 24 * 7, refreshToken);

        log("Refresh token stored successfully");
    } catch (error) {
        throw new Error("Failed to store refresh token");
    }
}

export async function removeRefreshToken(userId: number): Promise<void> {
    log("Removing refresh token from Redis");
    try {
        await redisClient.del(userId.toString());
        log("Refresh token removed successfully");
    } catch (error) {
        throw new Error("Failed to remove refresh token");
    }
}