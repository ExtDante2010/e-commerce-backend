import Express from "express";
import {
  allBlogCategory,
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  updateBlogCategory,
} from "../controller/blogCategoryContoller.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

export const router = Express.Router();

router.post("/", authMidellware, isAdmin, createBlogCategory);
router.put("/update-category/:id", authMidellware, isAdmin, updateBlogCategory);
router.get("/search-category/:id", getBlogCategory);
router.get("/", allBlogCategory);
router.delete(
  "/delete-category/:id",
  authMidellware,
  isAdmin,
  deleteBlogCategory
);
