import { Router, Request, Response, NextFunction } from "express";

import auth from './auth/auth.routes.js'

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    massage:"hello from /api"
  })
});

router.use('/auth', auth);



export default router;

