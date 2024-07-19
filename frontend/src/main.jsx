import React from "react";
import ReactDOM from "react-dom/client";

// style sheet
import "./index.css";

// router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes
import Home from "./routes/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
