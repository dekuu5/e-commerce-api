#!/bin/bash

# Base directory
BASE_DIR="src"


mkdir -p $BASE_DIR/api/users
mkdir -p $BASE_DIR/api/products
mkdir -p $BASE_DIR/api/categories
mkdir -p $BASE_DIR/api/orders
mkdir -p $BASE_DIR/api/cart
mkdir -p $BASE_DIR/api/reviews
mkdir -p $BASE_DIR/api/payments
mkdir -p $BASE_DIR/api/shipping
mkdir -p $BASE_DIR/api/wishlist
mkdir -p $BASE_DIR/middlewares
mkdir -p $BASE_DIR/utils
mkdir -p $BASE_DIR/types

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/users/user.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/users/user.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/users/user.services.ts

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/products/product.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/products/product.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/products/product.services.ts

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/categories/category.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/categories/category.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/categories/category.services.ts

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/orders/order.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/orders/order.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/orders/order.services.ts

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/cart/cart.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/cart/cart.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/cart/cart.services.ts

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/reviews/review.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/reviews/review.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/reviews/review.services.ts

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/payments/payment.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/payments/payment.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/payments/payment.services.ts

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/shipping/shipping.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/shipping/shipping.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/shipping/shipping.services.ts

echo "import { Request, Response } from 'express';" > $BASE_DIR/api/wishlist/wishlist.controllers.ts
echo "import { Router } from 'express';" > $BASE_DIR/api/wishlist/wishlist.routes.ts
echo "import { prisma } from '../../utils/db.js';" > $BASE_DIR/api/wishlist/wishlist.services.ts

echo "import { Request, Response, NextFunction } from 'express';" > $BASE_DIR/middlewares/auth.ts
echo "import { Request, Response, NextFunction } from 'express';" > $BASE_DIR/middlewares/validate.ts
echo "import { Request, Response, NextFunction } from 'express';" > $BASE_DIR/middlewares/authorization.ts



echo "Project structure created successfully!"