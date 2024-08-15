import { blue } from "@mui/material/colors";
import React from "react";
import { PulseLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#90CCF0" size={15} margin={2} />
    </div>
  );
};

export default Loading;
