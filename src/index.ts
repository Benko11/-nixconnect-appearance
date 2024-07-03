import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { ColourScheme } from "./schemes/ColourScheme";

config();
const app = express();
const port = process.env.PORT != null ? +process.env.PORT : 3000;

app.use(express.json());

const url = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost:27017/-nixconnect-appearance";

app.get("/", async (req, res) => {
  res.json({ message: "93pigeons" });
});

app.get("/colour-schemes", async (req, res) => {
  try {
    const colourSchemes = await ColourScheme.find();
    res.json(colourSchemes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/colour-schemes", async (req, res) => {
  const {
    name,
    primary,
    secondary,
    tertiary,
    background,
    foreground,
    error,
    card_background,
  } = req.body;
  const newItem = new ColourScheme({
    name,
    primary,
    secondary,
    tertiary,
    background,
    foreground,
    error,
    card_background,
  });

  try {
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad request");
  }
});

app.delete("/colour-schemes/:id", async (req, res) => {
  try {
    await ColourScheme.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (process.env.DEV === "true") {
      res.status(500).json(err);
    } else {
      res.status(500).send("Something went wrong");
    }
  }
});

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
