"use client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Movie, MovieResult } from "../page";

const getMovieData = async (id: number): Promise<Movie> => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const getMovieImages = async (id: number): Promise<Movie> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
      },
    }
  );
  const data = await response.json();
  console.log("images => ", data);
  return data;
};

export default function page() {
  const router = useRouter();
  const { id } = useParams();
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ["moviedata", id],
    queryFn: () => getMovieData(Number(id)),
  });

  const { data: images, error: imagesError } = useSuspenseQuery({
    queryKey: ["movieimages", id],
    queryFn: () => getMovieImages(Number(id)),
  });

  if (data) {
    console.log(data);
  }
  return (
    <main>
      <button onClick={() => router.back()}>Back</button>
      {isFetching ? (
        "PLEASE WAIT...."
      ) : (
        <div
          className="flex flex-row items-center w-full bg-zinc-900 p-2 text-center"
          key={data.id}
        >
          {/* <img
            src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
            alt={data.title}
            className="w-full bg-cover"
          /> */}
          {/* <img
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={data.title}
            className="w-96"
          />*/}
          <img
            src={`https://image.tmdb.org/t/p/w500/${
              data?.belongs_to_collection?.poster_path ||
              data?.poster_path ||
              data?.backdrop_path
            }`}
            alt={data.title}
            className="w-96"
          />
          {/*
          <img
            src={`https://image.tmdb.org/t/p/w500/${data.belongs_to_collection.backdrop_path}`}
            alt={data.title}
            className="w-96"
          /> */}
          <div className="flex flex-col items-center w-64 bg-zinc-900 m-5 p-2 text-center">
            <h1 className="text-3xl font-bold ">{data.title}</h1>
            <p className="text-xs">{data.overview}</p>
            <p className="text-xs">Release Date: {data.release_date}</p>
            <p className="text-xs">Runtime: {data.runtime} minutes</p>
            <p className="text-xs">Rating: {data.vote_average}</p>
          </div>
          {images?.backdrops?.map((image: any, index: number) => {
            return (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                alt={data.title}
                className="w-32"
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
