import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Movie } from "../types/types";

function PopularCard({ popular }: { popular: Movie }) {
  return (
    <div className="w-40 flex flex-col justify-center items-center hover:scale-105 cursor-pointer transition-all ease-in-out aspect-[9/14] m-1 relative group">
      <Image
        width={500}
        height={500}
        className="w-40 aspect-[9/14] rounded shadow-md"
        src={`https://image.tmdb.org/t/p/w500/${popular.poster_path}`}
        alt={popular.title}
      />
      <div className="absolute bottom-0 w-full h-1/3 rounded-md bg-gradient-to-b from-transparent to-black group-hover:h-3/4 transition-all ease-in-out flex flex-col justify-center text-white text-center">
        <h1 className="text-md font-bold text-white">{popular.title}</h1>
        <p className="text-md text-white hidden w-full justify-center items-center group-hover:flex group-hover:flex-row">
          {popular.vote_average.toFixed(1)}
          <StarIcon className="size-5 text-yellow-300 ml-1" />
        </p>
        <p className="text-sm hidden group-hover:block">
          {popular.release_date?.slice(0, 4)}
        </p>
      </div>
    </div>
  );
}

export default PopularCard;
