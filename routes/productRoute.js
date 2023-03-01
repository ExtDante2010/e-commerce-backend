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

router.post("/", createProduct);
router.get("/search-product/:id", getProduct);
router.get("/search-all-product", getallProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.delete("/delete-product/:id", deleteProduct);
