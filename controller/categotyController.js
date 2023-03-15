import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import { validateMoongoId } from "../utils/validateMongodb.js";

export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json({ newCategory });
  } catch {
    throw new Error("CATEGORY IS CERATED");
  }
});
