import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyRefreshToken } from '../utils/Tokens.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const { refreshToken } = req.body;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
            req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
            return next();
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                verifyRefreshToken(refreshToken)
                    .then(user => {
                        // @ts-ignore
                        if (user) {
                            // @ts-ignore
                            req.user = user;
                            return res.redirect('/auth/refresh-token');
                        } else {
                            return res.status(401).json({ message: "Invalid refresh token" });
                        }
                    })
                    .catch(error => {
                        return res.status(500).json({ message: "Failed to verify refresh token", error: error.message });
                    });
            } else {
                return res.status(401).json({ message: "Invalid token" });
            }
        }
    } else {
        return res.status(401).json({ message: "Authorization header missing" });
    }
}
export function authorizeRoles(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const userRole = req.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden: You do not have the required role to access this resource" });
        }

        next();
    };
}