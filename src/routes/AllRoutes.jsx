import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Form from "../components/lib/Form";
import { Table } from "@mui/material";
import Error from "../pages/Error";



function AllRoutes() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pets" element={<Products />} />
            <Route path="/forms" element={<Form />} />
            <Route path="/table" element={<Table />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default AllRoutes;