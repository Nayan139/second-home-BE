import express from "express";
import {
  deleteUser,
  forgotPassword,
  getActiveUser,
  getAllUsers,
  updateUser,
  userCreate,
  userLogin,
} from "../controllers/userController.js";
import { validateUser } from "../validators/userValidator.js";
import AuthMiddleware from "../midddleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", validateUser("createUser"), userCreate);

router.post("/login", validateUser("login"), userLogin);

router.patch("/user/forgot-password", forgotPassword);

router.patch(
  "/user/:uId/update",
  validateUser("updateUser"),
  AuthMiddleware,
  updateUser
);

router.delete("/user/:uId/delete", AuthMiddleware, deleteUser);

router.get("/user/all", AuthMiddleware, getAllUsers);

router.get("/user/active", AuthMiddleware, getActiveUser);

export { router as userRouter };
