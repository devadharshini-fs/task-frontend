import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 2500,
    style: {
      background: "#ffffff",
      color: "#111",
      borderRadius: "16px",
      padding: "14px 18px",
      fontWeight: "600",
    },
  }}
/>
  </React.StrictMode>
);