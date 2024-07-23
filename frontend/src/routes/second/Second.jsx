// Second.jsx

import { Outlet } from "react-router-dom";
import SecondNav from "./components/SecondNav";

export default function Second() {
  return (
    <>
      <SecondNav />
      <Outlet />
    </>
  );
}
