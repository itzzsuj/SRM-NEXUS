import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App"; // ✅ Corrected import

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider 
      withGlobalStyles 
      withNormalizeCSS 
      theme={{ fontFamily: "Poppins, sans-serif" }} // ✅ Prevent Mantine from overriding styles
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
