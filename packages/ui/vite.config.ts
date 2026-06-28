import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ["src"], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react-aria-components"],
      output: {
        assetFileNames: (info) =>
          info.names?.some((n) => n.endsWith(".css")) ? "style.css" : "[name][extname]",
      },
    },
    cssCodeSplit: false,
  },
});
