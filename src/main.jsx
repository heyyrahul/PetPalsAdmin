import React from "react";
import { createRoot } from "react-dom/client";
import { Navigate, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./middleware/AuthContext"; 
import "./index.css";
import { Suspense } from "react";
import ThemeSuspense from "./components/theme/ThemeSuspense";
import routes from "./routes/index";

const Main = () => {
  const { isLoggedIn } = useAuth(); 

  return (
    <React.StrictMode>
      <Suspense fallback={<ThemeSuspense />}>
        <Router>
          {isLoggedIn ? (
            <>{routes}</>
          ) : (
            <Navigate to="/adminlogin"/>
          )}
        </Router>
      </Suspense>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <Main />
  </AuthProvider>
);
