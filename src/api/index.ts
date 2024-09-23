import { Router, Request, Response, NextFunction } from "express";

import auth from './auth/auth.routes.js'
import user from "./users/user.routes.js";
import categories from "./categories/category.routes.js";
import products from "./products/product.routes.js";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    massage:"hello from /api"
  })
});

router.use('/auth', auth);
router.use('/users', user);
router.use('/categories', categories)
router.use('/products', products)



export default router;

