"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export type TV = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: Date;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type TVResult = {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
};

type MovieGenre = {
  id: number;
  name: string;
};

type MovieGenres = {
  genres: MovieGenre[];
};

const getTVsGenres = async (): Promise<MovieGenres> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const getTVs = async (page: number, genre: number): Promise<TVResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export default function Tvs() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState(35);
  const { data, isFetching, isPending, isLoading, refetch, error } = useQuery({
    queryKey: ["tvs", page, genre],
    queryFn: () => getTVs(page, genre),
  });
  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: getTVsGenres,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    console.log(data.results[0]);
  }

  return (
    <section className="w-full min-h-screen h-full">
      <header className="bg-transparent backdrop-blur-md p-2 text-white text-start w-full fixed top-0 flex flex-row items-center z-20 shadow-lg">
        <h1 className="text-2xl font-bold">TV Series</h1>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 p-2 rounded-lg w-1/4 ml-24"
        />
      </header>
      <aside className="bg-transparent backdrop-blur-md p-2 w-36 h-full fixed left-0 top-14 shadow-lg">
        <ul className="flex flex-row flex-wrap overflow-auto h-fit">
          {genres?.genres?.map((genree: any) => {
            return (
              <li
                key={genree.id}
                className={`text-white p-1 my-[2px] backdrop-blur-md ${
                  genree.id === genre ? "bg-slate-800/80" : "bg-slate-500/50"
                } w-full rounded hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out`}
                onClick={() => setGenre(genree.id)}
              >
                {genree.name}
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="flex flex-row flex-wrap ml-36 justify-center mt-14 w-auto h-fit">
        {isPending && <div>LOADING.......</div>}
        {data?.results?.map((movie: any) => {
          return <h5></h5>;
        })}
      </div>
    </section>
  );
}
