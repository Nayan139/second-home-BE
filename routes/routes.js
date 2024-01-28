import express from "express";
import { userRouter } from "./userRoute.js";
import { propertyRouter } from "./propertyRoute.js";

const router = express.Router();
router.use(userRouter);
router.use(propertyRouter);

export default router;
