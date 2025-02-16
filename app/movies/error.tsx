"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/solid";

function Error() {
  const router = useRouter();
  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col justify-center items-center text-white">
      <h1 className="font-bold text-5xl">Something went wrong!</h1>
      <HomeIcon
        className="size-16 text-red cursor-pointer animate-pulse hover:scale-110"
        onClick={() => router.push("/")}
      />
    </div>
  );
}

export default Error;
