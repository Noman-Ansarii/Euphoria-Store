import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastProvider } from "./context/ToastContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { CartListProvider } from "./context/CartListContext.jsx";
import App from "./App.jsx";
import "./index.css";

// theme.js (or theme.ts)
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    MyPurple: "#8a33fd", // Define your custom color
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ToastProvider>
        <Router>
          <CartListProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartListProvider>
        </Router>
      </ToastProvider>
    </ChakraProvider>
  </React.StrictMode>
);
