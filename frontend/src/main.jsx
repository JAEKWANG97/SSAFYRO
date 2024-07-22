import React from "react";
import ReactDOM from "react-dom/client";

// import components
import Navbar from "./components/Navbar.jsx";

// style sheet
import "./index.css";

// router                            
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes
import Home from "./routes/Home.jsx";
import First from "./routes/first/First.jsx";

 
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "first/",
        element: <First />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Navbar />
        <RouterProvider router={router} />
    </React.StrictMode>
);
