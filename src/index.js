import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



// LEVEL2
import { ThemeProvider } from "./context/Datacontext";
import App from './App';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
