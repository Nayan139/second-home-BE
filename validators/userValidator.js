import { query } from "express";
import { body } from "express-validator";

/**
 * @param {req} method - method
 */
export const validateUser = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("firstName")
          .exists({ checkNull: true })
          .withMessage("firstName is required")
          .isLength({ max: 75, min: 1 })
          .withMessage("Length of firstName required between 1 to 75"),
        body("lastName")
          .exists({ checkNull: true })
          .withMessage("lastName is required")
          .isLength({ max: 75, min: 1 })
          .withMessage("Length of lastName required between 1 to 75"),
        body("email")
          .exists({ checkNull: true })
          .isEmail()
          .withMessage("email is required, must be valid"),
        body("mobileNumber")
          .exists({ checkNull: true })
          .withMessage("mobile number is required"),
        body("password")
          .exists({ checkNull: true })
          .isStrongPassword()
          .withMessage("password is required, must be strong"),
        body("role")
          .exists()
          .withMessage("role is requiered")
          .isIn(["user", "admin"])
          .withMessage("role does contain invalid value"),
      ];
    }
    case "login": {
      return [
        body("email")
          .exists({ checkNull: true })
          .withMessage("email is required"),
        body("password")
          .exists({ checkNull: true })
          .withMessage("password is required"),
      ];
    }
    case "userId": {
      return [
        query("uId").exists({ checkNull: true }).withMessage("uId is required"),
      ];
    }
    case "updateUser": {
      return [
        body("firstName")
          .exists({ checkNull: true })
          .withMessage("firstName is required")
          .isLength({ max: 75, min: 1 })
          .withMessage("Length of firstName required between 1 to 75"),
        body("lastName")
          .exists({ checkNull: true })
          .withMessage("lastName is required")
          .isLength({ max: 75, min: 1 })
          .withMessage("Length of lastName required between 1 to 75"),
        body("email")
          .exists({ checkNull: true })
          .isEmail()
          .withMessage("email is required, must be valid"),
        body("mobileNumber")
          .exists({ checkNull: true })
          .withMessage("mobile number is required"),
      ];
    }
    default: {
      return [];
    }
  }
};
