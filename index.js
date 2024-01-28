import dotenv from "dotenv";
import session from "express-session";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import "./db/index.js";
//Routes
import router from "./routes/routes.js";
import { ConvertError, ErrorHandler } from "./midddleware/errors.js";
import AuthMiddleware from "./midddleware/authMiddleware.js";

dotenv.config();

const app = express("cors");
console.log("url", process.env.SECRET, process.env.PORT);

// app.use(AuthMiddleware);

/**
 * @description Catch all errors and sends stacktrace in development
 */
app.use(ErrorHandler);

/**
 * @description Catch 404 and forward to ErrorHandler
 */
// app.use(NotFound);

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/second-home/api/v1", router);

/**
 * @description Convert error and forward ro ErrorHandlet
 */
app.use(ConvertError);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on the 8080");
});
