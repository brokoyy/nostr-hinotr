import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";      // App.tsx は同じ src 内
import "./index.css";        // index.css も同じ src 内

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
