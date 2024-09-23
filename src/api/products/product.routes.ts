import { Router } from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByName
    
 } from './product.controllers.js';
import { validate } from '../../middlewares/validate.js';
import { productSchema } from '../../validators/productValidator.js';
import { authorizeRoles, verifyAccessToken } from '../../middlewares/auth.js';

const products = Router();

products.use(verifyAccessToken);

products.get('/', getProducts);
products.get('/:name', getProductByName);
products.get('/:id', getProductById);
products.post('/', validate(productSchema),authorizeRoles("ADMIN"),  createProduct);
products.put('/:id', validate(productSchema),authorizeRoles("ADMIN"),  updateProduct);
products.delete('/:id', authorizeRoles("ADMIN"), deleteProduct);

export default products;