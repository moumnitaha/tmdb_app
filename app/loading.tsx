import React from "react";
import { HashLoader } from "react-spinners";

function Loading() {
  return (
    <main className="flex justify-center items-center bg-green-950 h-screen w-full">
      <HashLoader />
    </main>
  );
}

export default Loading;
