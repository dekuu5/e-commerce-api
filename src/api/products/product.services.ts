import { Product } from '../../validators/productValidator.js';
import {prisma} from '../../db.js';

export const getProductsService = async () => {
  return await prisma.product.findMany({
    include: { category: true },
  });
};

export const getProductByNameService = async (name: string) => {
  return await prisma.product.findFirst({
    where: { name },
    include: { category: true },
  });
};

export const getProductByIdService = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
};

export const createProductService = async (data: Product) => {
    let product = await prisma.product.create({
        data: {
            name: data.name,
            description: data.description? data.description : '',
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId
        }
    });
};

export const updateProductService = async (id: number, data: { name: string; description?: string; price: number; stock: number; categoryId: number }) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProductService = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};

