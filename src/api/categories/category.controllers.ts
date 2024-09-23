import { Request, Response } from 'express';
import {
  getCategoriesService, createCategoryService, deleteCategoryService 
  
} from './category.services.js';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategoriesService();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await createCategoryService(name);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    await deleteCategoryService(name);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};