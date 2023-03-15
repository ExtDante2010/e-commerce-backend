import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import { validateMoongoId } from "../utils/validateMongodb.js";

//CREATE CATEGORY //

export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json({ newCategory });
  } catch {
    throw new Error("CATEGORY IS CERATED");
  }
});

// UPDATE CATEGORY //

export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const update = await Category.findOneAndUpdate(id, req.body, { new: true });
    res.json(update);
  } catch (error) {
    throw new Error(error);
  }
});

// SEARCH ALL CATEGORY //

export const allCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch {
    throw new Error();
  }
});

// SEARCH A CATEGORY //

export const getCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE CATEGORY //

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const categoryDelete = await Category.findOneAndDelete(id);
    res.json({ categoryDelete });
  } catch (error) {
    throw new Error(error);
  }
});
