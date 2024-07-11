import { Router } from "express";
import { ColourScheme } from "../schemes/ColourScheme";
import handleError from "../utils/handleError";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const colourSchemes = await ColourScheme.find();
    res.json(colourSchemes);
  } catch (err) {
    handleError(res, err);
  }
});

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    await ColourScheme.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
