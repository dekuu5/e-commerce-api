import { Router } from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from './cart.controllers.js';
import { validate } from '../../middlewares/validate.js';
import { cartItemSchema } from '../../validators/cartValidator.js';

const cart = Router();

cart.get('/:userId', getCart);
cart.post('/:userId', validate(cartItemSchema), addToCart);
cart.delete('/:userId/:productId', removeFromCart);
cart.delete('/:userId', clearCart);

export default cart;