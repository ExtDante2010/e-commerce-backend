import asyncHandlers from "express-async-handler";
import Product from "../models/productModels.js";
import slugify from "slugify";

// HANDLER CREATE PRODUCT //

export const createProduct = asyncHandlers(async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// HANDLER SEARCH A PRODUCT //

export const getProduct = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// HANDLER SEARCH ALL PRODUCT //

export const getallProduct = asyncHandlers(async (req, res) => {
  try {
    const getallProduct = await Product.find();
    res.json(getallProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// HANDLER UPDATE PRODUCT //

export const updateProduct = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const productUpdate = await Product.findOneAndUpdate(
      id,
      req.body,

      {
        new: true,
      }
    );
    res.json(productUpdate);
  } catch {
    throw new Error("Could not update product or not found");
  }
});

// HANDLER DELETE PRODUCT //

export const deleteProduct = asyncHandlers(async (req, res) => {
  const { id } = req.params;

  try {
    const productDelete = await Product.findOneAndDelete(id);
    res.json({
      productDelete,
    });
  } catch (error) {
    throw new Error(error);
  }
});
