import BlogCategory from "../models/blogCategoryModel.js";
import { validateMoongoId } from "../utils/validateMongodb.js";
import expressAsyncHandler from "express-async-handler";

//CREATE CATEGORY //

export const createBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await BlogCategory.create(req.body);
    res.json(newCategory);
  } catch {
    throw new Error("CATEGORY IS CERATED");
  }
});

// UPDATE CATEGORY //

export const updateBlogCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongoId(id);

  try {
    const update = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(update);
  } catch (error) {
    throw new Error(error);
  }
});

// SEARCH ALL CATEGORY //

export const allBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await BlogCategory.find();
    res.json(category);
  } catch {
    throw new Error();
  }
});

// SEARCH A CATEGORY //

export const getBlogCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongoId(id);
  try {
    const category = await BlogCategory.findById(id);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE CATEGORY //

export const deleteBlogCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongoId(id);
  try {
    const categoryDelete = await BlogCategory.findByIdAndDelete(id);
    res.json(categoryDelete);
  } catch (error) {
    throw new Error(error);
  }
});
