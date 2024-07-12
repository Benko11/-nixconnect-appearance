import { Router } from "express";
import handleError from "../utils/handleError";
import { Preference } from "../schemes/Preference";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const preferences = await Preference.find();
    res.json(preferences);
  } catch (err) {
    handleError(res, err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, _default } = req.body;
    const slug = (title as string).toLowerCase().trim().replace(/ /g, "-");
    const newPreference = new Preference({ title, slug, default: _default });
    await newPreference.save();
    res.json(newPreference);
  } catch (err) {
    handleError(res, err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Preference.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
