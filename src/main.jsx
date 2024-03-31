import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes";
import { Suspense } from "react";
import ThemeSuspense from "./components/theme/ThemeSuspense";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<ThemeSuspense />}>
      <RouterProvider router={router} />

    </Suspense>
  </React.StrictMode>
);
