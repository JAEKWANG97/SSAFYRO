// Guide.jsx

import { Outlet } from "react-router-dom";
import GuideNav from "./components/GuideNav";
import SecondNav from "../components/SecondNav";

export default function Guide() {
  return (
    <>
      <SecondNav />
      <GuideNav />
      <Outlet />
    </>
  );
}
