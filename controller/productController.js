import asyncHandlers from "express-async-handler";
// import Product from "../models/productModels";

// HANDLER CREATE PRODUCT //

export const createProduct = asyncHandlers(async (req, res) => {
  res.json({
    message: "Product created successfully",
  });

  //   const title = req.body.title;
  //   const findProduct = await Product.findOne({ title: title });
  //   if (!findProduct) {
  //     const newProduct = Product.create(req.body);
  //     res.json(newProduct);
  //   } else {
  //     throw new Error();
  //   }
});
