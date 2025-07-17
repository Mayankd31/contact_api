import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";
import { config } from "dotenv";

const app = express();

app.use(bodyParser.json());

// .env setup
config({ path: ".env" });

// user router
app.use("/api/user", userRouter);

// contact router
app.use("/api/contact", contactRouter);

// home route
app.get("/", (req, res) => {
  res.json({
    message: "This is home route",
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "NodeJS_Mastery_Course",
  })
  .then(() => console.log("Mongodb Connected...!!"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
