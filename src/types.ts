export interface MovieResults {
  results: FilterMovies[];
}

export interface FilterMovies {
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  // backdrop_path: string;
}
