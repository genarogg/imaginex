import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/components/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
})

