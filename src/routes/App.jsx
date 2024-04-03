import { Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import Layout from "../layouts/Layout";


function App() {
    return (
        <Router>
        <Layout />
        <AllRoutes />
      </Router>
    );
}

export default App