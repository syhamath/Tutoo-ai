import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Clean config – no Tailwind plugin needed for v3
export default defineConfig({
  plugins: [react()],
});
