import { Router } from 'express';
import { getCategories, createCategory, deleteCategory } from './category.controllers.js';
import { categorySchema } from '../../validators/categoryValidator.js';
import { authorizeRoles, verifyAccessToken } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';

const categories = Router();

categories.get('/',verifyAccessToken, getCategories);
categories.post('/add-category',verifyAccessToken,authorizeRoles("ADMIN"),  validate(categorySchema), createCategory);
categories.delete('/:name', verifyAccessToken,authorizeRoles("ADMIN"),  deleteCategory);

export default categories;