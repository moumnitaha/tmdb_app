"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import ImageLoader from "../components/ImageLoader";
import { XMarkIcon } from "@heroicons/react/24/solid";
import MovieCard from "../components/MovieCard";
import { MovieResult, Movie } from "../types/types";
import Orb from "@/Orb/Orb";

const Search = async (value: string): Promise<MovieResult> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${value}
`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

function MovieLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);
  const { data, isFetching } = useQuery({
    queryKey: ["search", value],
    queryFn: () => Search(value),
    enabled: !!value.length,
  });

  if (data) {
    console.log("search => ", data);
  }

  return (
    <div>
      <div className="w-full h-full fixed top-0 left-0">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <header className="bg-transparent backdrop-blur-md p-2 text-white text-start w-full fixed top-0 flex flex-row items-center z-20 shadow-lg">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          T-Movies
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 p-2 rounded-lg w-1/4 ml-48"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          disabled={value.length === 0}
          onClick={() => setText("")}
          className="bg-gray-800 p-2 rounded-lg -ml-10"
        >
          <XMarkIcon className="size-6" />
        </button>
      </header>
      {/* <aside className="bg-transparent backdrop-blur-md w-36 h-full fixed left-0 top-14"> */}
      {/* <ul className="flex flex-row flex-wrap overflow-auto min-h-full h-full no-scrollbar">
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Action
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Adventure
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Animation
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Comedy
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Crime
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Documentary
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Drama
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Family
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            Fantasy
          </li>
          <li className="text-white p-2 my-[2px] ml-0 backdrop-blur-md bg-slate-800/80 w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out">
            History
          </li>
        </ul> */}
      {/* </aside> */}
      <div className="ml-6 mt-16 mb-8">
        {data &&
          (data.results.length > 0 ? (
            <h5 className="m-4 text-3xl font-bold text-white">
              Movies results for "{value}"
            </h5>
          ) : (
            <h5 className="m-4 text-3xl font-bold text-white">
              No Movies Found for "{value}"
            </h5>
          ))}
        {isFetching && (
          <div className="flex flex-row flex-wrap justify-start w-auto h-fit ml-2">
            {Array.from({ length: 12 }, (_, i) => (
              <ImageLoader key={i} width={36} />
            ))}
          </div>
        )}
        <div className="flex flex-row flex-wrap justify-start w-auto h-fit ml-2">
          {data?.results.map((movie: Movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
        {children}
      </div>
      <footer className="p-2 text-white text-center w-full h-8 bg-transparent flex flex-row items-center justify-center">
        &copy; 2025 &nbsp;&nbsp;|&nbsp;&nbsp;
        <h1 className="text-xl font-bold cursor-pointer">T-Movies</h1>
      </footer>
    </div>
  );
}

export default MovieLayout;
