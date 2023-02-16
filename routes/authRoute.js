import Express from "express";
import {
  createUser,
  deleteAuser,
  getAlluser,
  getAuser,
  loginUser,
} from "../controller/userController.js";

const router = Express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAlluser);
router.get("/:id", getAuser);
router.delete("/:id", deleteAuser);

export default router;
