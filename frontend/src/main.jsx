import React from "react";
import ReactDOM from "react-dom/client";

// import components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// style sheet
import "./index.css";

// router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes
import Home from "./routes/Home.jsx";

import Login from "./routes/accounts/Login.jsx";

import First from "./routes/first/First.jsx";

import GuidePersonality from "./routes/second/guide/GuidePersonality.jsx";
import GuidePT from "./routes/second/guide/GuidePT.jsx";
import GuideIT from "./routes/second/guide/GuideIT.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "account/",
    children: [{ path: "login", element: <Login /> }],
  },
  {
    path: "first/",
    element: <First />,
  },
  {
    path: "second/",
    children: [
      {
        path: "guide",
        children: [
          {
            path: "personality",
            element: <GuidePersonality />,
          },
          {
            path: "pt",
            element: <GuidePT />,
          },
          {
            path: "it",
            element: <GuideIT />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
