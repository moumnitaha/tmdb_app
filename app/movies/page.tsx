"use client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";
import ImageLoader from "../components/ImageLoader";
import Slider from "../components/Slider";
import axios from "axios";
import { Movie, MovieGenres, MovieResult, TV, TVResult } from "../types/types";

const getMoviesGenres = async (): Promise<MovieGenres> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.data;
  console.log(data);
  return data;
};

const getMovies = async (page: number, genre: number): Promise<MovieResult> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

const getPopularMovies = async (page: number): Promise<MovieResult> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&sort_by=popularity.desc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

const getTVs = async (page: number, genre: number): Promise<TVResult> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

const getTVsGenres = async (): Promise<MovieGenres> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/tv/list?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.data;
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

  const { data: popular, isFetching: isPopularFetching } = useQuery({
    queryKey: ["popular", page],
    queryFn: () => getPopularMovies(page),
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
    <main className="w-full min-h-screen h-full">
      <h5 className="m-4 text-3xl font-bold text-white">Popular Movies</h5>
      <Slider popular={popular} isPopularFetching={isPopularFetching} />
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
          Array.from({ length: 12 }, (_, i) => (
            <ImageLoader key={i} width={48} />
          ))}
        {data?.results?.map((movie: Movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
      <h5 className="m-4 text-3xl font-bold text-white">Trending TV Series</h5>
      <div className="ml-3 w-[calc(100%-12px)] flex flex-row items-center overflow-auto no-scrollbar">
        {tvgenres?.genres?.map((genre: any) => (
          <p
            key={genre.id}
            className="text-white p-2 min-w-fit backdrop-blur-md bg-slate-100/10 rounded-full hover:bg-slate-800/60 font-bold cursor-pointer transition-all ease-in-out m-1"
            onClick={() => setTVGenres(genre.id)}
          >
            {genre.name}
          </p>
        ))}
      </div>
      <div className="flex flex-row flex-wrap  justify-start  w-auto h-fit">
        {isTvFetch &&
          Array.from({ length: 12 }, (_, i) => (
            <ImageLoader key={i} width={48} />
          ))}
        {tvs?.results?.map((tv: TV) => {
          return <TvCard key={tv.id} tv={tv} />;
        })}
      </div>
    </main>
  );
}
