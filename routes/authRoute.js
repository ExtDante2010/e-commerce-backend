import Express from "express";
import {
  blockUser,
  createUser,
  deleteAuser,
  getAlluser,
  getAuser,
  handleRefreshToken,
  loginUser,
  unblockUser,
  updateAuser,
} from "../controller/userController.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

const router = Express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAlluser);
router.get("/:id", authMidellware, isAdmin, getAuser);
router.get("/refresh", handleRefreshToken);
router.delete("/:id", deleteAuser);
router.put("/edit-user", authMidellware, updateAuser);
router.put("/block-user/:id", authMidellware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMidellware, isAdmin, unblockUser);

export default router;
