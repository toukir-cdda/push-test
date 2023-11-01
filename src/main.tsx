import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

serviceWorker.unregister();
