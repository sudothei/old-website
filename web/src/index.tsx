import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "static/index.css";
import { Home } from "./routes/Home";
import { Demo } from "./routes/Demo";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
