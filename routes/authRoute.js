import Express from "express";
import {
  createUser,
  deleteAuser,
  getAlluser,
  getAuser,
  loginUser,
  updateAuser,
} from "../controller/userController.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

const router = Express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAlluser);
router.get("/:id", authMidellware, isAdmin, getAuser);
router.delete("/:id", deleteAuser);
router.put("/:id", updateAuser);

export default router;
