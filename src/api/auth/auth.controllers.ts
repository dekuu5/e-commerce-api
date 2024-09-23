import { Request ,Response } from "express";
import { loginService, registerService, signOutService } from "./auth.services.js";

import { any } from "zod";
import { log } from "console";
import { generateAccessToken, verifyRefreshToken } from "../../utils/Tokens.js";

export async function registerController(req: Request, res: Response) {
    try {
        const userData = req.body;
        const result = await registerService(userData); 
        res.status(201).json({ message: "User registered successfully", user: result });
    } catch (error ) {
        res.status(500).json({ message: "Failed to register user", error: (error as any).message });
    }
}


export async function loginController(req: Request, res: Response) {
    log("loginController - Request body:", req.body);
    try {
        const userData = req.body;
        console.log("loginController - User data:", userData);
        const tokens = await loginService(userData);
        log("loginController - Tokens generated:", tokens);
        
        // This returns JWT tokens
        res.status(200).json({ message: "Login successful", tokens });
    } catch (error) {
        log("loginController - Error:", error);
        res.status(401).json({ message: "Invalid credentials", error: (error as any).message });
    }
}

export async function signOutController(req: Request, res: Response) {
    try {
        // @ts-ignore
        const userId = req.user.id;
        await signOutService(userId);
        res.status(200).json({ message: "Sign-out successful" });
    } catch (error) {
        log("signOutController - Error:", error);
        res.status(500).json({ message: "Failed to sign out", error: (error as any).message });
    }
}

export async function refreshTokenController(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token missing" });
        }

        const user = await verifyRefreshToken(refreshToken);

        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const accessToken = generateAccessToken(user.id, user.email);

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: "Failed to refresh token", error: (error as any).message });
    }
}