import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import colourSchemeRouter from "./api/colour-scheme";
import fontRouter from "./api/font";

config();
const app = express();
const port = process.env.PORT != null ? +process.env.PORT : 3000;

app.use(express.json());
app.use("/colour-schemes", colourSchemeRouter);
app.use("/fonts", fontRouter);
app.use(express.static("public"));

const url = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost:27017/-nixconnect-appearance";

app.listen(port, () => console.log(`listening on port ${port}`));

async function main() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

main();
