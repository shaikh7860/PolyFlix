import React from "react";
import ReactDOM from "react-dom";
import MyApp from "./MyApp";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

// With React v18:
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <MyApp />
    </BrowserRouter>
  </CookiesProvider>
);
