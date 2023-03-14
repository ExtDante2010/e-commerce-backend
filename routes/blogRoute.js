import Express from "express";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  likeBlog,
  searchAllBlogs,
  searchBlog,
  updateBlog,
} from "../controller/blogController.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

export const router = Express.Router();

// BLOG //

router.post("/", authMidellware, isAdmin, createBlog); // CREATE BLOG //
router.put("/likes", authMidellware, likeBlog); // LIKE A BLOG //
router.put("/dislikes", authMidellware, dislikeBlog); // DISLIKE A BLOG //

router.put("/update-blog/:id", authMidellware, isAdmin, updateBlog); //UPDATE BLOG //
router.get("/search-blog/:id", searchBlog); // SEARCH A BLOG //
router.get("/all-blogs", searchAllBlogs); // SEARCH ALL BLOG //
router.delete("/delete-blog/:id", authMidellware, isAdmin, deleteBlog); // DELETE A BLOG //
