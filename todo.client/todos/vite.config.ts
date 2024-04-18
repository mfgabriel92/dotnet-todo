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
  plugins: [
    react(),
    federation({
      filename: "todo-entry.js",
      name: "todos",
      exposes: {},
      remotes: {
        todoItem: "http://localhost:3001/dist/assets/todo-item-entry.js"
      },
      shared: ["react", "react-dom", "react-redux", "@reduxjs/toolkit"]
    })
  ]
});
