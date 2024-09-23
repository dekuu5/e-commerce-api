import { prisma } from '../../db.js';

export const getCartService = async (userId: number) => {
  return await prisma.cart.findUnique({
    where: { userId },
    include: { products: true },
  });
};

export const addToCartService = async (userId: number, data: { productId: number; quantity: number }) => {
  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  return await prisma.cartProduct.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: data.productId,
      },
    },
    update: {
      quantity: {
        increment: data.quantity,
      },
    },
    create: {
      cartId: cart.id,
      productId: data.productId,
      quantity: data.quantity,
    },
  });
};

export const removeFromCartService = async (userId: number, productId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error('Cart not found');
  }

  return await prisma.cartProduct.delete({
    where: {
      id: {
        cartId: cart.id,
        productId,
      },
    },
  });
};

export const clearCartService = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error('Cart not found');
  }

  return await prisma.cartProduct.deleteMany({
    where: { cartId: cart.id },
  });
};
