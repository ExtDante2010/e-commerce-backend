import Blog from "../models/blogModel.js";
import asyncHandlers from "express-async-handler";
import { validateMoongoId } from "../utils/validateMongodb.js";

// HANDLER CREATER BLOG //

export const createBlog = asyncHandlers(async (req, res) => {
  try {
    const createBlog = await Blog.create(req.body);
    res.json({
      createBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// HANDLER UPDATE BLOG //

export const updateBlog = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  validateMoongoId(id);
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
  validateMoongoId(id);
  try {
    const findBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateView = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    );
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
  validateMoongoId(id);
  try {
    const deleted = await Blog.findOneAndDelete(id);
    res.json({ deleted });
  } catch {
    throw new Error("Blog not found");
  }
});

// LIKE BLOG //

export const likeBlog = asyncHandlers(async (req, res) => {
  const { blogId } = req.body;
  validateMoongoId(blogId);

  //-- FIND THE BLOG WITCH YOU WANT TO BE LIKE --//
  const blog = await Blog.findById(blogId);

  //- FIND THE LOGIN USER --//
  const loginUserId = req?.user?._id;

  //- FIND IF THE USER HAS LIKED THE LOG --//
  const isLike = blog?.isLike;

  //-FIND IF THE USER HAS DISLIKED THE BLOG -//
  const disLiked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (disLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDislike: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLike) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLike: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLike: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

export const dislikeBlog = asyncHandlers(async (req, res) => {
  const { blogId } = req.body;
  validateMoongoId(blogId);

  //-- FIND THE BLOG WITCH YOU WANT TO BE LIKE --//
  const blog = await Blog.findById(blogId);

  //- FIND THE LOGIN USER --//
  const loginUserId = req?.user?._id;

  //- FIND IF THE USER HAS LIKED THE LOG --//
  const isDislike = blog?.isDislike;

  //-FIND IF THE USER HAS DISLIKED THE BLOG -//
  const Liked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (Liked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLike: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDislike) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDislike: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDislike: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
