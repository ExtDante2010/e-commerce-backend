import Express from "express";
import {
  allCategory,
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controller/categotyController.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

export const router = Express.Router();

router.post("/", authMidellware, isAdmin, createCategory);
router.put("/update-category/:id", authMidellware, isAdmin, updateCategory);
router.get("/search-category/:id", getCategory);
router.get("/", allCategory);
router.delete("/delete-category/:id", authMidellware, isAdmin, deleteCategory);
