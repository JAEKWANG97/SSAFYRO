import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Outlet,
} from "react-router-dom";
import useAuthStore from "./stores/AuthStore";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/accounts/Login.jsx";
import Social from "./routes/accounts/components/Social.jsx";
import Profile from "./routes/accounts/Profile.jsx";
import PersonalityFeedback from "./routes/accounts/components/PersonalityFeedback.jsx";
import PtFeedback from "./routes/accounts/components/PtFeedback.jsx";
import BestWorstQuestion from "./routes/accounts/components/BestWorstQuestion.jsx";
import QuestionFeedback from "./routes/accounts/components/QuestionFeedback.jsx";
import Essay from "./routes/first/Essay.jsx";
import Test from "./routes/first/Test.jsx";
import GuidePersonality from "./routes/second/guide/GuidePersonality.jsx";
import GuidePT from "./routes/second/guide/GuidePT.jsx";
import GuideIT from "./routes/second/guide/GuideIT.jsx";
import Interview from "./routes/second/interview/Interview.jsx";
import CreateRoom from "./routes/second/interview/CreateRoom.jsx";
import WaitRoom from "./routes/second/interview/Room.jsx";
import PTReady from "./routes/second/interview/PTReady.jsx";
import PT from "./routes/second/interview/PT.jsx";
import Survey from "./components/Survey.jsx";
import "./index.css";

// Custom layout component for conditional Navbar and Footer rendering
const AppLayout = () => {
  const location = useLocation();
  const userInfo = useAuthStore((state) => state.setIsLogin);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const setIsLogin = useAuthStore((state) => state.setIsLogin);


  // 초기 렌더링 시 로그인 상태 복원
  useEffect(() => {
    const token = localStorage.getItem("Token");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (token && storedUserInfo) {
      setIsLogin(true);
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [setIsLogin, setUserInfo]);

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

  // Define the main page route where the background should not be gray
  const isMainPage = location.pathname === "/";
  const isPersonalityFeedbackPage =
    location.pathname.includes("/account/profile/") &&
    location.pathname.includes("personality_feedback");
  const isPtFeedbackPage =
    location.pathname.includes("/account/profile/") &&
    location.pathname.includes("pt_feedback");
  return (
    <div
      className={`flex flex-col min-h-screen ${isMainPage ? "" : "bg-gray-50"}`}
    >
      {!shouldHideNavbar && <Navbar />}
      <div className="flex-grow">
        <div
          className="container mx-auto"
          style={{
            maxWidth:
              isPersonalityFeedbackPage || isPtFeedbackPage ? "100%" : "1100px", // PersonalityFeedback 페이지에서는 제어를 풀거나 다르게 설정
            paddingLeft: "4rem",
            paddingRight: "4rem",
          }}
        >
          <Outlet />
        </div>
      </div>
      {isMainPage && <Footer />}
    </div>
  );
};

// Define the router with AppLayout as the root layout component
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Social /> },
      { path: "/question_feedback/search", element: <QuestionFeedback /> },
      { path: "/question_feedback/:id", element: <QuestionFeedback /> },
      {
        path: "account/",
        children: [
          { path: "login", element: <Login /> },
          {
            path: "profile",
            children: [
              { path: "", element: <Profile /> },
              {
                path: "personality_feedback",
                element: <PersonalityFeedback />,
              },
              { path: "pt_feedback", element: <PtFeedback /> },
              { path: "question_feedback", element: <QuestionFeedback /> },
              { path: "bestworst_feedback", element: <BestWorstQuestion /> },
            ],
          },
        ],
      },
      { path: "first/essay", element: <Essay /> },
      { path: "first/test", element: <Test /> },
      { path: "second/interview/:tab", element: <Interview /> },
      { path: "second/guide/:tab", element: <GuidePersonality /> },
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
          { path: "interview/room/:roomid", element: <WaitRoom /> },
          { path: "interview/room/:roomid/pt_ready", element: <PTReady /> },
          { path: "interview/room/:roomid/pt", element: <PT /> },
          { path: "interview/room/:roomid/pt/survey", element: <Survey /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
