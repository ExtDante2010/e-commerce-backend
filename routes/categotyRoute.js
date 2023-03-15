import Express from "express";
import { createCategory } from "../controller/categotyController.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

export const router = Express.Router();

router.post("/", authMidellware, isAdmin, createCategory);
