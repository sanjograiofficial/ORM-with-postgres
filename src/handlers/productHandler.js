import prisma from "../db/db.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../services/products.service.js";
import { validateAllFieldTypes } from "../validators/fieldValidators.js";

const getAllProducts = asyncHandler(async (req, res) => {
  let allProducts = await getAllProductsService();
  if (allProducts.length == 0) throw new Error("No product found");

  res.json({
    message: "All Products found",
    data: allProducts,
  });
});
const getProductById = asyncHandler(async (req, res) => {
  let { id } = req.params;
  if (id == "") {
    return res.status(400).json({
      error: "Id cannot be empty",
    });
  }
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Id must be a number",
    });
  }
  let matchProduct = await getProductByIdService(Number(id));
  res.status(200).json({
    message: "Product found",
    data: matchProduct,
  });
});
const createProduct = async (req, res) => {
  let data = req.body;
  // let { name, email } = data;
  // let validateMsg = validateAllFieldTypes("email", email);
  // if (validateMsg != null) {
  //   return res.status(400).json({
  //     error: validateMsg,
  //   });
  // }
  // validateMsg = validateAllFieldTypes("name", name);
  // if (validateMsg != null) {
  //   return res.status(400).json({
  //     error: validateMsg,
  //   });
  // }
  let createdProduct = await createProductService(data);
  res.status(201).json({
    message: "Product created successfully",
    data: createdProduct,
  });
};
const updateProduct = async (req, res) => {
  let id = req.params;
  if (id == "") {
    return res.status(400).json({
      error: "Id cannot be empty",
    });
  }
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Id must be a number",
    });
  }
  let data = req.body;
  let { name, email } = req.body;
  let updatedProduct = await updateProductService(Number(id), data);
  res.status(200).json({
    message: "Product updated successfully",
    data: updatedProduct,
  });
};
const deleteProduct = async (req, res) => {
  let id = req.params;
  if (id == "") {
    return res.status(400).json({
      error: "Id cannot be empty",
    });
  }
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Id must be a number",
    });
  }
  let deletedProduct = await deleteProductService(Number(id));
  res.status(200).json({
    message: "Product deleted successfully",
    data: deletedProduct,
  });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
