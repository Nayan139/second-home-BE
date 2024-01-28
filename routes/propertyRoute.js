import express from "express";
import {
  propertyAll,
  propertyCreate,
  propertyDelete,
  propertyGet,
  propertyUpdate,
} from "../controllers/propertyController.js";
import AuthMiddleware from "../midddleware/authMiddleware.js";
import { validateProperty } from "../validators/propertyValidatior.js";
const router = express.Router();

router.post(
  "/property/create",
  AuthMiddleware,
  validateProperty("createProperty"),
  propertyCreate
);

router.patch(
  "/property/:propertyId/update",
  AuthMiddleware,
  validateProperty("updateProperty"),
  propertyUpdate
);

router.get("/property/all", propertyAll);

router.delete("/property/:propertyId/delete", AuthMiddleware, propertyDelete);

router.post("/property/get", propertyGet);
export { router as propertyRouter };
