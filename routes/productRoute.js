import Express from "express";
import {
  createProduct,
  deleteProduct,
  getallProduct,
  getProduct,
  updateProduct,
} from "../controller/productController.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

export const router = Express.Router();

// Product //

router.post("/", authMidellware, isAdmin, createProduct);
router.get("/search-product/:id", getProduct);
router.get("/", getallProduct);
router.put("/update-product/:id", authMidellware, isAdmin, updateProduct);
router.delete("/delete-product/:id", authMidellware, isAdmin, deleteProduct);
