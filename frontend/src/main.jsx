// main.jsx

import React from "react";
import ReactDOM from "react-dom/client";

// import components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
// style sheet
import "./index.css";

// router
import { createBrowserRouter, RouterProvider, useLocation, Outlet } from "react-router-dom";
// import routes
import Home from "./routes/Home.jsx";
import Login from "./routes/accounts/Login.jsx";
import Profile from "./routes/accounts/Profile.jsx";
import PersonalityFeedback from "./routes/accounts/PersonalityFeedback.jsx";
import PtFeedback from "./routes/accounts/PtFeedback.jsx";
import First from "./routes/first/First.jsx";
import GuidePersonality from "./routes/second/guide/GuidePersonality.jsx";
import GuidePT from "./routes/second/guide/GuidePT.jsx";
import GuideIT from "./routes/second/guide/GuideIT.jsx";
import Interview from "./routes/second/interview/Interview.jsx";
import CreateRoom from "./routes/second/interview/CreateRoom.jsx";
import Room from "./routes/second/interview/Room.jsx";
import PTReady from "./routes/second/interview/PTReady.jsx";
import PT from "./routes/second/interview/PT.jsx";
import Survey from "./components/Survey.jsx";

// Custom layout component for conditional Navbar rendering
const AppLayout = () => {
  const location = useLocation();

  // Define routes where the Navbar should be hidden
  const hideNavbarRoutes = [
    "/second/interview/room",
    "/second/interview/room/:roomid/pt",
    "/second/interview/room/:roomid/pt/survey",
  ];

  // Check if the current path matches any of the routes where the Navbar should be hidden
  const shouldHideNavbar = hideNavbarRoutes.some((route) => 
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && <Navbar />}
      <div className="flex-grow px-64">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// Define the router with AppLayout as the root layout component
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "account/",
        children: [
          { path: "login", element: <Login /> },
          { path: "profile/:userId", children: [
            { path: "", element: <Profile /> },
            { path: "personality_feedback", element: <PersonalityFeedback /> },
            { path: "pt_feedback", element: <PtFeedback /> },
          ],}
        ],
      },
      { path: "first/", element: <First /> },
      {
        path: "second/",
        children: [
          {
            path: "guide",
            children: [
              { path: "personality", element: <GuidePersonality /> },
              { path: "pt", element: <GuidePT /> },
              { path: "it", element: <GuideIT /> },
            ],
          },
          { path: "interview", element: <Interview /> },
          { path: "interview/createroom", element: <CreateRoom /> },
          { path: "interview/room/:roomid", element: <Room /> },
          { path: "interview/room/:roomid/pt_ready", element: <PTReady /> },
          { path: "interview/room/:roomid/pt", element: <PT /> },
          { path: "interview/room/:roomid/pt/survey", element: <Survey /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
