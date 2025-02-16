"use client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";
import ImageLoader from "../components/ImageLoader";

export type Movie = {
  id: number;
  adult: false;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  belongs_to_collection: {
    poster_path: string;
    backdrop_path: string;
  };
  release_date: string;
  title: string;
  video: false;
  runtime: number;
  vote_average: number;
  vote_count: number;
};

export type MovieResult = {
  page: number;
  results: Movie[];
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

const getMoviesGenres = async (): Promise<MovieGenres> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
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

const getMovies = async (page: number, genre: number): Promise<MovieResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

const getPopularMovies = async (
  page: number,
  genre: number
): Promise<MovieResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.json();
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

export default function Movies() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [movieGenres, setMovieGenres] = useState(35);
  const [tvGenres, setTVGenres] = useState(35);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { data, isFetching, isPending, isLoading, refetch, error } = useQuery({
    queryKey: ["movies", page, movieGenres],
    queryFn: () => getMovies(page, movieGenres),
  });
  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: getMoviesGenres,
  });

  const { data: tvgenres } = useQuery({
    queryKey: ["tvGenres"],
    queryFn: getTVsGenres,
  });

  const { data: popular } = useQuery({
    queryKey: ["popular", page, movieGenres],
    queryFn: () => getPopularMovies(page, movieGenres),
  });

  const {
    data: tvs,
    isFetching: isTvFetch,
    error: tvError,
  } = useQuery({
    queryKey: ["tvs", page, tvGenres],
    queryFn: () => getTVs(page, tvGenres),
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    console.log(data.results[0]);
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef?.current?.clientWidth, // Scroll by the width of the container
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  // Function to scroll the slider to the right (NEXT)
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef?.current?.clientWidth, // Scroll by the width of the container
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <section className="w-full min-h-screen h-full">
      <header className="bg-transparent backdrop-blur-md p-2 text-white text-start w-full fixed top-0 flex flex-row items-center z-20 shadow-lg">
        <h1 className="text-2xl font-bold">Movies</h1>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 p-2 rounded-lg w-1/4 ml-48"
        />
      </header>
      <aside className="bg-transparent backdrop-blur-md w-36 h-full fixed left-0 top-14">
        <ul className="flex flex-row flex-wrap overflow-auto min-h-full h-full no-scrollbar">
          {genres?.genres?.map((genre: any) => {
            return (
              <li
                key={genre.id}
                className={`text-white p-2 my-[2px] ml-0 backdrop-blur-md ${
                  genre.id === movieGenres
                    ? "bg-slate-800/80"
                    : "bg-slate-100/10"
                } w-full rounded-e hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out`}
                onClick={() => setMovieGenres(genre.id)}
              >
                {genre.name}
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="w-[calc(100%-144px)] h-full mt-16 ml-36 ">
        <h5 className="m-4 text-3xl font-bold text-white">Popular Movies</h5>
        <div className="flex flex-row  w-[96%] h-60 items-center ml-4">
          <button
            onClick={scrollLeft}
            className="w-12 h-56 bg-gray-800/10 backdrop-blur shadow-md text-white rounded-md "
          >
            <ChevronLeftIcon className="size-10" />
          </button>
          <div
            className="flex flex-row overflow-auto w-full no-scrollbar h-52"
            ref={sliderRef}
          >
            {popular?.results.map((movie: Movie) => {
              return (
                <div
                  className="w-40 flex flex-col justify-center items-center hover:scale-105 transition-all ease-in-out aspect-[9/14] m-1 relative group"
                  key={movie.id}
                >
                  <Image
                    width={500}
                    height={500}
                    className="w-40 aspect-[9/14] rounded shadow-md"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="absolute bottom-0 w-full h-1/3 rounded-md bg-gradient-to-b from-transparent to-black group-hover:h-3/4 transition-all ease-in-out flex flex-col justify-center text-white text-center">
                    <h1 className="text-md font-bold text-white">
                      {movie.title}
                    </h1>
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
            })}
          </div>
          <button
            onClick={scrollRight}
            className="w-12 h-56 bg-gray-800/10 backdrop-blur shadow-md text-white rounded-md"
          >
            <ChevronRightIcon className="size-10" />
          </button>
        </div>
        <h5 className="m-4 text-3xl font-bold text-white">Trending Movies</h5>
        <div className="ml-2 w-[calc(100%-8px)] flex flex-row items-center overflow-auto no-scrollbar">
          {genres?.genres?.map((genre: any) => (
            <p
              key={genre.id}
              className="text-white p-2 min-w-fit backdrop-blur-md bg-slate-100/10 rounded-full m-1 hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out"
              onClick={() => setMovieGenres(genre.id)}
            >
              {genre.name}
            </p>
          ))}
        </div>
        <div className="flex flex-row flex-wrap  justify-start  w-auto h-fit ml-2">
          {isPending &&
            Array.from({ length: 10 }, (_, i) => <ImageLoader key={i} />)}
          {data?.results?.map((movie: Movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
        <h5 className="m-4 text-3xl font-bold text-white">
          Trending TV Series
        </h5>
        <div className="ml-3 w-[calc(100%-12px)] flex flex-row items-center overflow-auto no-scrollbar">
          {tvgenres?.genres?.map((genre: any) => (
            <p
              key={genre.id}
              className="text-white p-2 min-w-fit backdrop-blur-md bg-slate-100/10 rounded-full hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out"
              onClick={() => setTVGenres(genre.id)}
            >
              {genre.name}
            </p>
          ))}
        </div>
        <div className="flex flex-row flex-wrap  justify-start  w-auto h-fit">
          {isTvFetch &&
            Array.from({ length: 10 }, (_, i) => <ImageLoader key={i} />)}
          {tvs?.results?.map((tv: TV) => {
            return <TvCard key={tv.id} tv={tv} />;
          })}
        </div>
      </main>
    </section>
  );
}
