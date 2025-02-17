import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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
import ImageLoader from "./ImageLoader";
import { TV } from "../types/types";

const getTvData = async (id: number): Promise<TV> => {
  const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
  });
  const data = await response.data;
  console.log(data);
  return data;
};

function TvCard({ tv }: { tv: TV }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isFetching } = useQuery({
    queryKey: ["tvdata", tv.id],
    queryFn: () => getTvData(Number(tv.id)),
    enabled: isOpen,
  });

  if (data) {
    console.log("tv=> ", data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex flex-col items-center w-48 aspect-[9/13] bg-white/20 backdrop-blur-sm m-2 text-center rounded-md shadow-md group cursor-pointer overflow-hidden"
          key={tv.id}
          onClick={() => {
            // router.push(`/tv/${tv.id}`);
            setIsOpen(true);
          }}
        >
          <Image
            height={500}
            width={500}
            priority
            src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
            alt={tv?.name}
            className="w-48 aspect-16-9 rounded-md group-hover:scale-125 transition-all ease-in-out"
          />
          <div className="absolute bottom-0 w-full h-1/4 rounded-md bg-gradient-to-b from-transparent to-black group-hover:h-3/4 transition-all ease-in-out flex flex-col justify-center text-white">
            <h1 className="text-xl font-bold text-white leading-6">
              {tv.name}
            </h1>
            <p className="text-md text-white hidden w-full justify-center items-center group-hover:flex group-hover:flex-row">
              {tv.vote_average.toFixed(1)}
              <StarIcon className="size-5 text-yellow-300 ml-1" />
            </p>
            <p className="text-sm hidden group-hover:block">
              {new Date(tv.first_air_date).getFullYear()}
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
              alt={data?.name || ""}
              className="w-48 mx-2 aspect-16-9 rounded-md group-hover:scale-125 transition-all ease-in-out"
            />
          )}
          <DialogHeader>
            <DialogTitle>{isFetching ? "Loading..." : data?.name}</DialogTitle>
            <DialogDescription className="h-full overflow-hidden">
              {isFetching ? "Loading..." : data?.overview}
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="flex flex-row w-full justify-between">
          <div className="flex flex-col items-center justify-center flex-1">
            <Label className="font-bold">Release Date</Label>
            <p>
              {isFetching
                ? "Loading..."
                : new Date(
                    data?.first_air_date || Date.now()
                  ).toLocaleDateString("EN-US")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <Label className="font-bold">Seasons</Label>
            <p>{isFetching ? "Loading..." : data?.number_of_seasons}</p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <Label className="font-bold">Episodes</Label>
            <p>{isFetching ? "Loading..." : data?.number_of_episodes}</p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <Label className="font-bold">Runtime</Label>
            <p>
              {isFetching ? "Loading..." : data?.episode_run_time[0]} minutes
            </p>
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
          {/* <Button onClick={() => router.push(`/tv/${data?.id}`)}>
            View More
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TvCard;
