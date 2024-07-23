// main.jsx

import React from "react";
import ReactDOM from "react-dom/client";

// import components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// style sheet
import "./index.css";

// router
import { createBrowserRouter, RouterProvider} from "react-router-dom";
// import routes
import Home from "./routes/Home.jsx";

import Login from "./routes/accounts/Login.jsx";
import Profile from "./routes/accounts/Profile.jsx";
import Personality_feedback from "./routes/accounts/Personality_feedback.jsx";
import Pt_feedback from "./routes/accounts/Pt_feedback.jsx";

import First from "./routes/first/First.jsx";

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
    path: "account/",
    children: [
      { path: "login", element: <Login /> },
      { path: "profile/:userId",  children: [
        {
          path: "",
          element: <Profile />,
        },
        {
          path: "personality_feedback",
          element: <Personality_feedback />,
        },
        {
          path: "pt_feedback",
          element: <Pt_feedback />,
        },
      ],}
    ]
      ,
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
      {
        path: "interview",
        element: <Interview />,
      },
      {
        path: "/second/interview/createroom",
        element: <CreateRoom />,
      },
      {
        path: "/second/interview/room/:roomid",
        element: <Room />,
      },
      {
        path: "/second/interview/room/:roomid/pt_ready",
        element: <PTReady />,
      },
      {
        path: "/second/interview/room/:roomid/pt",
        element: <PT />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  </React.StrictMode>
);
