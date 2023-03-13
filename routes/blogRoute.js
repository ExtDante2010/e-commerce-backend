import Express from "express";
import { createBlog } from "../controller/blogController.js";

export const router = Express.Router();

// BLOG //

router.get("/", createBlog);
