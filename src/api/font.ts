import { Router } from "express";
import handleError from "../utils/handleError";
import { Font } from "../schemes/Font";
import fs from "fs";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const fonts = await Font.find();
    res.json(fonts);
  } catch (err) {
    handleError(res, err);
  }
});

router.post("/", async (req, res) => {
  const { name, url } = req.body;

  const newFont = new Font({ name, url });
  console.log(process.cwd());
  if (!fs.existsSync(`./public/fonts/${url}`)) {
    res.status(400).json({ message: "Font file not found" });
    return;
  }

  try {
    await newFont.save();
    res.json(newFont);
  } catch (err) {
    handleError(res, err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Font.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
