import Express from "express";
import {
  createBlog,
  deleteBlog,
  searchAllBlogs,
  searchBlog,
  updateBlog,
} from "../controller/blogController.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

export const router = Express.Router();

// BLOG //

router.post("/", authMidellware, isAdmin, createBlog);
router.put("/update-blog/:id", authMidellware, isAdmin, updateBlog);
router.get("/search-blog/:id", searchBlog);
router.get("/all-blogs", searchAllBlogs);
router.delete("/delete-blog/:id", deleteBlog);
