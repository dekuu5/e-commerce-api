import { Request } from 'express';

// declare module 'express-serve-static-core' {
//     export interface Request {
//         user?: {
//             id: number;
//             email: string;
//         };
//     }
// }

declare global {
  namespace Express {
    interface Request {
        user?: {
            id: number;
            email: string;
        };
    }
  }
}