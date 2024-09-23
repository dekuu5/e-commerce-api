import { prisma } from "../../db.js";

export async function getUserProfile(userId: number) {
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    let { password, role, id, ...rest } = user;
    return rest
}

export async function updateUserProfile(userId: number, data: any) {
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    let { password, role, id, ...rest } = user;
    return rest
}

export async function deleteUserProfile(userId: number) {
    return prisma.user.delete({ where: { id: userId } });
}

export async function getAllUsers() {
    return prisma.user.findMany();
}

export async function getUserById(userId: number) {
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }


    return 
}

export async function updateUserById(userId: number, data: any) {
    return prisma.user.update({ where: { id: userId }, data });
}

export async function deleteUserById(userId: number) {
    return prisma.user.delete({ where: { id: userId } });
}