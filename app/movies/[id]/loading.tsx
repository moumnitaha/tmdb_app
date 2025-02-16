import React from "react";
import { ScaleLoader } from "react-spinners";

function Loding() {
  return (
    <main className="flex justify-center items-center w-full h-screen bg-red-950">
      <p className="text-white text-xl">HHHHHHHHHHHHHHHHHHHHHHh</p>
      <ScaleLoader loading width={20} height={100} />
    </main>
  );
}

export default Loding;
