import "./index.css";
import "@/i18n";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@tabler/core/dist/js/tabler.esm.min.js";
import "@tabler/core/dist/libs/dropzone/dist/dropzone.css";
import "@tabler/core/dist/css/tabler.min.css";
import "@tabler/core/dist/css/tabler-vendors.min.css";
import "@tabler/core/dist/css/tabler-flags.min.css";
import "@tabler/core/dist/css/tabler-payments.min.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
