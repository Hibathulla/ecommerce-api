import dotenv from "dotenv";
dotenv.config();
import mongoose, { Mongoose } from "mongoose";
// const mongoose: Mongoose = require("mongoose");
import { app } from "./app";

//mongoose connect
const DB: any = process.env.DATABASE?.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD as any
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((err) => console.log("Error connecting to database...💥"));

// 4) start the server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 SHUTTING DOWN...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
