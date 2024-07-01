import mongoose from "mongoose";
const { Schema } = mongoose;

const colourSchemeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
    tertiary: { type: String, required: true },
    error: { type: String, required: true },
    foreground: { type: String, required: true },
    background: { type: String, required: true },
    card_background: { type: String, required: true },
  },
  { collection: "main.colour_schemes" }
);

const ColourScheme = mongoose.model("ColourScheme", colourSchemeSchema);
export { ColourScheme };
