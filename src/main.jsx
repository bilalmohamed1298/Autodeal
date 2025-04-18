import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.scss";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Prevent opening DevTools and inspect
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') || 
      (e.ctrlKey && e.shiftKey && e.key === 'J') || 
      (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
);
