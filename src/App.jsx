import { Route, RouterProvider, Routes } from "react-router-dom";


function App() {
    return (
        <RouterProvider>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
       </RouterProvider>
    );
}

export default App