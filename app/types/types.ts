export type Movie = {
  id: number;
  adult: false;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  backdrops: Array<{
    file_path: string;
  }>;
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

export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieGenres = {
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
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
};

export type TVResult = {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
};
