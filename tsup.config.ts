import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  dts: true, // Generate .d.ts files
  outDir: "dist",
  sourcemap: true,
  clean: true, // Clean the output directory before each build
  minify: true,
});
