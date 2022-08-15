export interface MovieResults {
  results: Movie[];
}

export interface Movie {
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  overview: string;
}

export interface MovieRating {
  rating_lte: number;
  rating_gte: number;
}

//added overview for details - not sure if this is where it needs to go
