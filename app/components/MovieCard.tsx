import React from "react";
import { Movie as MovieType } from "../movies/page";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

function MovieCard({ movie }: { movie: MovieType }) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center w-48 aspect-[9/13] bg-white/20 backdrop-blur-sm m-2 text-center rounded-md shadow-md group cursor-pointer overflow-hidden"
      key={movie.id}
      onClick={() => {
        router.push(`/movies/${movie.id}`);
      }}
    >
      <Image
        height={500}
        width={500}
        priority
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="w-48 aspect-16-9 rounded-md group-hover:scale-125 transition-all ease-in-out"
      />
      <div className="absolute bottom-0 w-full h-1/4 rounded-md bg-gradient-to-b from-transparent to-black group-hover:h-3/4 transition-all ease-in-out flex flex-col justify-center text-white">
        <h1 className="text-xl font-bold text-white">{movie.title}</h1>
        <p className="text-md text-white hidden w-full justify-center items-center group-hover:flex group-hover:flex-row">
          {movie.vote_average.toFixed(1)}
          <StarIcon className="size-5 text-yellow-300 ml-1" />
        </p>
        <p className="text-sm hidden group-hover:block">
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
