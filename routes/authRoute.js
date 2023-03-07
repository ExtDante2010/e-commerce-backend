import Express from "express";
import {
  blockUser,
  createUser,
  deleteAuser,
  forgotPasswordToken,
  getAlluser,
  getAuser,
  handleRefreshToken,
  loginUser,
  logout,
  resetPassword,
  unblockUser,
  updateAuser,
  updatePassword,
} from "../controller/userController.js";
import authMidellware, { isAdmin } from "../midellwares/authMidellware.js";

const router = Express.Router();

// user //

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMidellware, updatePassword);
router.post("/login", loginUser);
router.get("/all-users", getAlluser);
router.get("/refresh", authMidellware, isAdmin, handleRefreshToken);
router.get("/logout", logout);
router.get("/getuser/:id", authMidellware, isAdmin, getAuser);
router.delete("/delete-user/:id", deleteAuser);
router.put("/edit-user", authMidellware, updateAuser);
router.put("/block-user/:id", authMidellware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMidellware, isAdmin, unblockUser);

export default router;
