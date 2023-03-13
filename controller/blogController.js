import Blog from "../models/blogModel.js";
import asyncHandlers from "express-async-handler";
import { validateMoongoId } from "../utils/validateMongodb.js";

// HANDLER CREATER BLOG //

export const createBlog = asyncHandlers(async (req, res) => {
  try {
    const createBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      createBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// HANDLER UPDATE BLOG //

export const updateBlog = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  try {
    const blogUpdate = await Blog.findOneAndUpdate(id, req.body, {
      new: true,
    });
    res.json(blogUpdate);
  } catch {
    throw new Error("Could not update product or not found");
  }
});

// HANDLER SEARCH A BLOG //

export const searchBlog = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  try {
    const findBlog = await Blog.findById(id);
    res.json(findBlog);
  } catch {
    throw new Error("Blog not found");
  }
});

// HANDLER SEARCH ALL BLOGS //

export const searchAllBlogs = asyncHandlers(async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.json(allBlogs);
  } catch {
    throw new Error();
  }
});

// HANDLER DELETE A BLOG //

export const deleteBlog = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Blog.findOneAndDelete(id);
    res.json({ deleted });
  } catch {
    throw new Error("Blog not found");
  }
});
