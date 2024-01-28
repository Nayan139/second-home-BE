import { query } from "express";
import { body } from "express-validator";

/**
 * @param {req} method - method
 */
export const validateProperty = (method) => {
  switch (method) {
    case "createProperty": {
      return [
        body("propertyName")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("propertyName is required"),
        body("propertyType")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("propertyType is required"),
        body("address.addressLine1")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("addressLine1 is required"),
        body("address.area")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("area is required"),
        body("address.city")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("city is required"),
        body("address.state")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("state is required"),
        body("propertyImages")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("propertyImages is required"),
        body("propertyOwner.ownerName")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("ownerName is required"),
        body("propertyOwner.ownerContactNumber")
          .exists({ checkFalsy: true, checkNull: true })
          .withMessage("ownerMobileNumber is required"),
        // body("availableFor")
        //   .exists({ checkNull: true, checkFalsy: true })
        //   .withMessage("availableFor is required"),
        body("rent")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("rent is required"),
        body("bedType")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("bedType is required"),
      ];
    }
    case "updateProperty": {
      return [
        body("propertyName")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("propertyName is required"),
        body("propertyType")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("propertyType is required"),
        body("address.addressLine1")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("addressLine1 is required"),
        body("address.area")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("area is required"),
        body("address.city")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("city is required"),
        body("address.state")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("state is required"),
        body("propertyOwner.ownerName")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("ownerName is required"),
        body("propertyOwner.ownerContactNumber")
          .exists({ checkFalsy: true, checkNull: true })
          .withMessage("ownerMobileNumber is required"),
        // body("availableFor")
        //   .exists({ checkNull: true, checkFalsy: true })
        //   .withMessage("availableFor is required"),
        body("rent")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("rent is required"),
        body("bedType")
          .exists({ checkNull: true, checkFalsy: true })
          .withMessage("bedType is required"),
      ];
    }
    default: {
      return [];
    }
  }
};
