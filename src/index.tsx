import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./compontents";
import { GlobalProvider } from "./context/GlobalContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
