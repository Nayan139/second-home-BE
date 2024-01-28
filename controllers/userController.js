import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.js";
import User from "../models/userModel.js";

export const userCreate = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new APIError({
        message: "Body invalid",
        status: 400,
        stack: errors.array(),
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new APIError({
        message: "User exists already, please login instead.",
        status: 400,
        stack: errors.array(),
      });
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json({
      status: "true",
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new APIError({
        message: "Body invalid",
        status: 400,
        stack: errors.array(),
      });
    }
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      throw new APIError({
        message: "Email and Password not match",
        status: 400,
        stack: errors.array(),
      });
    } else {
      // created token
      let token;
      token = jwt.sign(
        {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
        },
        process.env.SECRET,
        {
          expiresIn: process.env.EXPIRE_TOKEN_TIME,
        }
      );
      return res.status(200).json({
        status: "true",
        message: "User login successfully.",
        data: {
          token,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new APIError({
        message: "Body invalid",
        status: 400,
        stack: errors.array(),
      });
    }

    const { uId } = req.params;

    const user = await User.findById(uId);
    if (!user) {
      throw new APIError({
        message: "User doesn't exists with this email.",
        status: 400,
      });
    }

    await User.findByIdAndUpdate(uId, req.body);
    return res.status(200).json({
      status: "true",
      message: "User updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { uId } = req.params;

    const user = await User.findById(uId);

    if (user) {
      await User.findByIdAndDelete(uId);
    } else {
      throw new APIError({
        message: "User doesn't exists with this id.",
        status: 400,
      });
    }

    return res.status(200).json({
      status: "true",
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new APIError({
        message: "User doesn't exists with this email.",
        status: 400,
      });
    }

    await User.findOneAndUpdate({ email: req.body.email }, req.body);
    return res.status(200).json({
      status: "true",
      message: "Password updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      status: "true",
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveUser = async (req, res, next) => {
  try {
    const users = await User.findById(req.user.id).select("-password");
    return res.status(200).json({
      status: "true",
      message: "User fetched successfully.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
