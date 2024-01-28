import { validationResult } from "express-validator";
import APIError from "../utils/APIError.js";
import Property from "../models/propertyModel.js";

export const propertyCreate = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new APIError({
        message: "Body invalid",
        status: 400,
        stack: errors.array(),
      });
    }

    const property = new Property(req.body);
    await property.save();
    res.status(201).json({
      status: "true",
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    next(error);
  }
};

export const propertyUpdate = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new APIError({
        message: "Body invalid",
        status: 400,
        stack: errors.array(),
      });
    }

    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);

    if (!property) {
      throw new APIError({
        message: "Property not found",
        status: 404,
      });
    }
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "true",
      message: "Property updated successfully",
      updatedProperty,
    });
  } catch (error) {
    next(error);
  }
};

export const propertyAll = async (req, res, next) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      status: "true",
      properties,
      message: "All properties fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const propertyDelete = async (req, res, next) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);

    if (!property) {
      throw new APIError({
        message: "Property not found",
        status: "false",
      });
    }
    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({
      status: "true",
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const propertyGet = async (req, res, next) => {
  try {
    const { search = "", filter = "" } = req.body;
    const properties = await Property.find({
      $or: [
        {
          "address.city": { $regex: filter, $options: "i" },
          propertyName: { $regex: search, $options: "i" },
        },
      ],
    });
    res.status(200).json({
      status: "true",
      properties,
      message: "Properties fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
