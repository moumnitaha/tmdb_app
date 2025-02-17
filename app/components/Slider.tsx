import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import PopularCard from "./PopularCard";
import ImageLoader from "./ImageLoader";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { MovieResult, Movie } from "../types/types";

function Slider({
  popular,
  isPopularFetching,
}: {
  popular: MovieResult | undefined;
  isPopularFetching: boolean;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef?.current?.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef?.current?.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-row  w-[96%] h-60 items-center ml-4">
      <button
        onClick={scrollLeft}
        className="w-12 h-1/2 bg-gray-800/10 hover:bg-gray-800/50 transition-all ease-in-out backdrop-blur shadow-md text-white rounded-md "
      >
        <ChevronLeftIcon className="size-10" />
      </button>
      <div
        className="flex flex-row overflow-auto w-full no-scrollbar h-52"
        ref={sliderRef}
      >
        {isPopularFetching &&
          Array.from({ length: 12 }, (_, i) => (
            <ImageLoader key={i} width={36} />
          ))}
        {popular?.results.map((movie: Movie) => {
          return <PopularCard key={movie.id} popular={movie} />;
        })}
      </div>
      <button
        onClick={scrollRight}
        className="w-12 h-1/2 bg-gray-800/10 hover:bg-gray-800/50 transition-all ease-in-out backdrop-blur shadow-md text-white rounded-md"
      >
        <ChevronRightIcon className="size-10" />
      </button>
    </div>
  );
}

export default Slider;
