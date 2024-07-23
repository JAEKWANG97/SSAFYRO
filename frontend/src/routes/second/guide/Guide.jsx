// Guide.jsx

import { Outlet } from "react-router-dom";
import GuideNav from "./components/GuideNav";

export default function Guide() {
  return (
    <>
      <GuideNav />
      <Outlet />
    </>
  );
}
