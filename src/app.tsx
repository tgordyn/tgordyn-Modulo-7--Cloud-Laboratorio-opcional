import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { ListPage } from "./pages/list";
import { DetailPage } from "./pages/detail";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="*" element={<div>Not Found</div>} /> {/* Ruta 404 */}
    </Routes>
  );
};
