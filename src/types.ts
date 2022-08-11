export interface MovieResults {
  data: {
    results: FilterMovies[];
  };
}

export interface FilterMovies {
  title: string;
  voteAverage: number;
  releaseDate: string;
}
