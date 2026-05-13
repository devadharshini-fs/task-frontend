import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 2000,
    style: {
      background: "#ffffff",
      color: "#111",
      borderRadius: "16px",
      padding: "14px 18px",
      fontWeight: "600",
    },
  }}
/>
  </>
);