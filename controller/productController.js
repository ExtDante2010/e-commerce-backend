import asyncHandlers from "express-async-handler";
import User from "../models/userModels.js";
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

export const addToWishlist = asyncHandlers(async (req, res) => {
  const { _id } = req.user;
  const { proId } = req.body;
  try {
    const user = await User.findById(_id);
    const addAlready = user.wishlist.find((id) => id.toString() === proId);
    if (addAlready) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: proId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: proId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const raitingProduct = asyncHandlers(async (req, res) => {
  const { _id } = req.user;
  const { star, proId } = req.body;
  try {
    const product = await Product.findById(proId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRate = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star },
        },
        {
          new: true,
        }
      );
      res.json(updateRate);
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        _id,
        {
          $push: {
            ratings: {
              start: star,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
  } catch (error) {
    throw new Error(error);
  }
});
