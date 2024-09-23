import { Request, Response } from "express";
import { getUserProfile, updateUserProfile, deleteUserProfile, getAllUsers, getUserById, updateUserById, deleteUserById } from "./user.services.js";

export async function getUserProfileController(req: Request, res: Response) {
    try {
        // @ts-ignore
        const userId = req.user?.id;
        // @ts-ignore
        const userProfile = await getUserProfile(userId);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(400).json({ message: "Failed to get user profile", error: (error as any).message });
    }
}

export async function updateUserProfileController(req: Request, res: Response) {
    try {
        // @ts-ignore
        const userId = req.user?.id;
                // @ts-ignore
        const updatedProfile = await updateUserProfile(userId, req.body);
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user profile", error: (error as any).message });
    }
}

export async function deleteUserProfileController(req: Request, res: Response) {
    try {
        // @ts-ignore
        const userId = req.user?.id;
        // @ts-ignore
        await deleteUserProfile(userId);
        res.status(200).json({ message: "User profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user profile", error: (error as any).message });
    }
}

export async function getAllUsersController(req: Request, res: Response) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to get users", error: (error as any).message });
    }
}

export async function getUserByIdController(req: Request, res: Response) {
    try {
        // @ts-ignore
        const userId = parseInt(req.params.id);
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        if ((error as any).message === "User not found") {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(500).json({ message: "Failed to get user", error: (error as any).message });
    }
}

export async function updateUserByIdController(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.id);
        const updatedUser = await updateUserById(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user", error: (error as any).message });
    }
}

export async function deleteUserByIdController(req: Request, res: Response) {
    try {
        // @ts-ignore
        const userId = parseInt(req.params.id);
        await deleteUserById(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: (error as any).message });
    }
}