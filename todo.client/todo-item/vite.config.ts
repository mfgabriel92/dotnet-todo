import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3001
  },
  plugins: [
    react(),
    federation({
      filename: "todo-item-entry.js",
      name: "todoItem",
      exposes: {
        "./TodoItem": "./src/components/TodoItem.tsx"
      },
      remotes: {},
      shared: ["react", "react-dom", "react-redux", "@reduxjs/toolkit"]
    })
  ]
});
