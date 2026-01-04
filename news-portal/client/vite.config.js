import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Network access ke liye zaroori hai
    port: 5173, // Port fix rahega
    allowedHosts: [
      "admin.thelocalmirror.in",
      "localhost"
    ]
  }
});
