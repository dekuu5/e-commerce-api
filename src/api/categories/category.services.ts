import { prisma } from '../../db.js';


export const getCategoriesService = async () => {
    let categories = await prisma.category.findMany();
    let cat = categories.map((category) => {
      return {
          id: category.id,
        name: category.name,
          
        };
    }
    );
    return  cat;
};

export const createCategoryService = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const deleteCategoryService = async (name: string) => {
  return await prisma.category.delete({
    where: { name },
  });
};