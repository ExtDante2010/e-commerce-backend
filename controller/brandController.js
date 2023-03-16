import expressAsyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import { validateMoongoId } from "../utils/validateMongodb.js";

//CREATE CATEGORY //

export const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch {
    throw new Error("CATEGORY IS CERATED");
  }
});

// UPDATE CATEGORY //

export const updateBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const update = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(update);
  } catch (error) {
    throw new Error(error);
  }
});

// SEARCH ALL CATEGORY //

export const allBrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.find();
    res.json(brand);
  } catch {
    throw new Error();
  }
});

// SEARCH A CATEGORY //

export const getBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongoId(id);
  try {
    const brand = await Brand.findById(id);
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE CATEGORY //

export const deleteBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongoId(id);
  try {
    const BrandDelete = await Brand.findByIdAndDelete(id);
    res.json(BrandDelete);
  } catch (error) {
    throw new Error(error);
  }
});
