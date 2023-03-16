import Express from "express";
import {
  allBrand,
  createBrand,
  deleteBrand,
  getBrand,
  updateBrand,
} from "../controller/brandController.js";

import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

export const router = Express.Router();

router.post("/", authMidellware, isAdmin, createBrand);
router.put("/update-brand/:id", authMidellware, isAdmin, updateBrand);
router.get("/search-brand/:id", getBrand);
router.get("/all-brand", allBrand);
router.delete("/delete-brand/:id", authMidellware, isAdmin, deleteBrand);
