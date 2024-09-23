import { Request, Response } from 'express';
import { getCartService, addToCartService, removeFromCartService, clearCartService } from './cart.services.js';

export const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const cart = await getCartService(parseInt(userId));
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  try {
    const cartItem = await addToCartService(parseInt(userId), { productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;
  try {
    await removeFromCartService(parseInt(userId), parseInt(productId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await clearCartService(parseInt(userId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};