import { Request, Response } from 'express';
import {
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService,
    getProductByNameService
} from './product.services.js';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsService();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
        const product = await getProductByNameService(name);
        if (product) {
        res.json(product);
        } else {
        res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
}
    

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await getProductByIdService(parseInt(id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock, categoryId } = req.body;
  try {
    const product = await createProductService({ name, description, price, stock, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stock, categoryId } = req.body;
  try {
    const product = await updateProductService(parseInt(id), { name, description, price, stock, categoryId });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteProductService(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};