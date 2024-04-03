import React from "react";
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../middleware/AuthContext";

const Layout = lazy(() => import("../layouts/Layout"));
const Error = lazy(() => import("../pages/Error"));
const Dashboard = lazy(() => import("../pages/Dashboard")); 
const Products = lazy(() => import("../pages/Products"));
const Form = lazy(() => import("../components/lib/Form"));
const Table = lazy(() => import("../pages/Table"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));

const routes = (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pets" element={<Products />} />
      <Route path="/forms" element={<Form />} />
      <Route path="/table" element={<Table />} />
      <Route path="*" element={<Error />} />
    </Route>
    <Route path="/adminlogin" element={<AdminLogin />} />
  </Routes>
);

export default routes;
