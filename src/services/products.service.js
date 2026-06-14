import prisma from "../db/db.js";

const getAllProductsService = async () => {
  return await prisma.products.findMany();
};

const getProductByIdService = async (id) => {
  const products = await prisma.products.findUnique({
    where: {
      id,
    },
  });
  if (!products) throw new Error("No products found");
  return products;
};

const createProductService = async (data) => {
  return await prisma.products.create({
    data,
  });
};

const updateProductService = async (id, data) => {
  return await prisma.products.update({
    where: {
      id,
    },
    data,
  });
};

const deleteProductService = async (id) => {
  return await prisma.products.delete({
    where: {
      id,
    },
  });
};

export {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
};
