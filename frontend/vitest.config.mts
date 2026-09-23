import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Vite is the test runner only. Next.js remains the application bundler.
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
  },
});
