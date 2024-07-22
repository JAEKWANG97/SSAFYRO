// main.jsx

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
import Second from "./routes/second/Second.jsx";
import Guide from "./routes/second/guide/Guide.jsx";
import GuidePersonality from "./routes/second/guide/GuidePersonality.jsx";
import GuidePT from "./routes/second/guide/GuidePT.jsx";
import GuideIT from "./routes/second/guide/GuideIT.jsx";
import Interview from "./routes/second/interview/Interview.jsx";
import CreateRoom from "./routes/second/interview/CreateRoom.jsx";
import Room from "./routes/second/interview/Room.jsx";
import PTReady from "./routes/second/interview/PTReady.jsx";
import PT from "./routes/second/interview/PT.jsx"; // PT 컴포넌트 추가

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/second",
    element: <Second />,
    children: [
      {
        path: "guide",
        element: <Guide />,
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
      {
        path: "interview",
        element: <Interview />,
      },
      {
        path: "/second/interview/createroom",
        element: <CreateRoom />
      },
      {
        path: "/second/interview/room/:roomid",
        element: <Room />
      },
      {
        path: "/second/interview/room/:roomid/pt_ready",
        element: <PTReady />
      },
      {
        path: "/second/interview/room/:roomid/pt",
        element: <PT />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="relative min-h-dvh">
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  </React.StrictMode>
);
