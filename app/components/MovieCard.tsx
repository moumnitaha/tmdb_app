import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ImageLoader from "./ImageLoader";
import { Movie } from "../types/types";

const getMovieData = async (id: number): Promise<Movie> => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
  });
  const data = await response.data;
  console.log(data);
  return data;
};

function MovieCard({ movie }: { movie: Movie }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isFetching } = useQuery({
    queryKey: ["moviedata", movie.id],
    queryFn: () => getMovieData(Number(movie.id)),
    enabled: isOpen,
  });

  if (data) {
    console.log(data);
  }

  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex flex-col items-center w-48 aspect-[9/13] bg-white/20 backdrop-blur-sm m-2 text-center rounded-md shadow-md group cursor-pointer overflow-hidden"
          key={movie.id}
          onClick={() => {
            setIsOpen(true);
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
            <h1 className="text-xl font-bold text-white leading-6">
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
      </DialogTrigger>
      <DialogContent className="p-8 text-center">
        <div className="flex flex-row">
          {isFetching ? (
            <ImageLoader width={48} />
          ) : (
            <Image
              height={500}
              width={500}
              priority
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              alt={movie.title}
              className="w-48 mx-2 aspect-16-9 rounded-md group-hover:scale-125 transition-all ease-in-out"
            />
          )}
          <DialogHeader>
            <DialogTitle>{isFetching ? "Loading..." : data?.title}</DialogTitle>
            <DialogDescription className="h-full overflow-hidden">
              {isFetching ? "Loading..." : data?.overview}
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="flex flex-row w-full justify-between">
          <div className="flex flex-col items-center justify-center flex-1">
            <Label className="font-bold">Release Date</Label>
            <p>{isFetching ? "Loading..." : data?.release_date}</p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <Label className="font-bold">Runtime</Label>
            <p>{isFetching ? "Loading..." : data?.runtime} minutes</p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <Label className="font-bold">Rating</Label>
            <p className="flex flex-row justify-center items-center">
              {isFetching ? "Loading..." : data?.vote_average?.toFixed(1)}
              {!isFetching && (
                <StarIcon className="size-5 text-yellow-300 ml-1" />
              )}
            </p>
          </div>
          {/* <Button onClick={() => router.push(`/movies/${movie.id}`)}>
            View More
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MovieCard;
