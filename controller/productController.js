import asyncHandlers from "express-async-handler";
import Product from "../models/productModels.js";
import slugify from "slugify";
import query from "express";
import e from "cors";
import { parse } from "dotenv";

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
    //FILTER ..
    const queryObj = { ...req.query };
    const excluideFields = ["page", "sort", "limit", "fields"];
    excluideFields.forEach((element) => delete queryObj[element]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    // SORTING ..
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join("");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limitingh the fiels ...

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join("");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("this page does not exist");
    }
    const product = await query;

    res.json(product);
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
