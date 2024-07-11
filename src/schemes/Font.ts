import mongoose, { Schema } from "mongoose";

const fontSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
  },
  { collection: "fonts" }
);

const Font = mongoose.model("Font", fontSchema);
export { Font };
