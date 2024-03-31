import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";

const Layout = lazy(() => import("../layouts/Layout"));
const Error = lazy(() => import("../pages/Error"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/Products"));
const Form = lazy(() => import("../components/lib/Form"));
const Table = lazy(() => import("../pages/Table"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/pets",
        element: <Products />,
      },
      {
        path: "/forms",
        element: <Form />,
      },  
      {
        path: "/table",
        element: <Table />, 
      },
      
      {
          path: "*",
          element: <Error />,
        }
    
     
    
    ],
    
  },
  {
    path:"/adminlogin",
    element: <AdminLogin/>
  }
]);

export default router;
