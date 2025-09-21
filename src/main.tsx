import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { CartProvider } from "./context/CartProvider";
import App from "./App";
import "./index.css";
// import "./premium-styles.css"; // <-- DELETE THIS LINE

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <CartProvider>
        <App />
      </CartProvider>
    </ClerkProvider>
  </React.StrictMode>
);
