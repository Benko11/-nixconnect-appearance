import mongoose, { Schema } from "mongoose";

const preferenceSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  default: { type: String, required: true },
});

const Preference = mongoose.model("Preference", preferenceSchema);
export { Preference };
