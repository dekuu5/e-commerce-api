import { loginService } from './auth.services.js';
import { prisma } from '../../db.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../../utils/Tokens.js';
import { storeRefreshToken } from '../../utils/refreshTokenManager.js';

// Mock dependencies
//ignore
jest.mock('../../db', () => ({
    prisma: {
        user: {
            findUnique: jest.fn()
        }
    }
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn()
}));

jest.mock('../../utils/Tokens', () => ({
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn()
}));

jest.mock('../../utils/refreshTokenManager', () => ({
    storeRefreshToken: jest.fn()
}));

describe('loginService', () => {
    const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword'
    };

    const mockUserData = {
        email: 'test@example.com',
        password: 'password'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should login successfully with valid credentials', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (generateAccessToken as jest.Mock).mockReturnValue('accessToken');
        (generateRefreshToken as jest.Mock).mockReturnValue('refreshToken');
        (storeRefreshToken as jest.Mock).mockResolvedValue(undefined);

        const result = await loginService(mockUserData);

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { email: mockUserData.email }
        });
        expect(bcrypt.compare).toHaveBeenCalledWith(mockUserData.password, mockUser.password);
        expect(generateAccessToken).toHaveBeenCalledWith(mockUser.id, mockUser.email);
        expect(generateRefreshToken).toHaveBeenCalledWith(mockUser.id, mockUser.email);
        expect(storeRefreshToken).toHaveBeenCalledWith(mockUser.id, 'refreshToken');
        expect(result).toEqual({ accessToken: 'accessToken', refreshToken: 'refreshToken' });
    });

    it('should throw an error with invalid credentials', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(loginService(mockUserData)).rejects.toThrow('Invalid credentials');

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { email: mockUserData.email }
        });
        expect(bcrypt.compare).toHaveBeenCalledWith(mockUserData.password, mockUser.password);
        expect(generateAccessToken).not.toHaveBeenCalled();
        expect(generateRefreshToken).not.toHaveBeenCalled();
        expect(storeRefreshToken).not.toHaveBeenCalled();
    });

    it('should throw an error if user is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(loginService(mockUserData)).rejects.toThrow('Invalid credentials');

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { email: mockUserData.email }
        });
        expect(bcrypt.compare).not.toHaveBeenCalled();
        expect(generateAccessToken).not.toHaveBeenCalled();
        expect(generateRefreshToken).not.toHaveBeenCalled();
        expect(storeRefreshToken).not.toHaveBeenCalled();
    });
});