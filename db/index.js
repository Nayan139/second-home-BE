import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const url = process.env.MONOGO_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
});

const con = mongoose.connection;

con.on("open", () => {
  console.log("DB successfully connected...");
});
