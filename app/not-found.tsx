"use client";
import React from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
function NotFound() {
  const router = useRouter();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h5 className="text-white font-thin text-5xl">404 | NOT FOUND</h5>
      <div className="flex flex-row justify-center items-center">
        <p className="text-slate-200">page not found, please go back to</p>
        {"   "}
        <HomeIcon
          className="size-8 text-white cursor-pointer hover:scale-110 ml-2"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
}

export default NotFound;
