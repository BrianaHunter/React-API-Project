import axios from "axios";
import { config } from "../config";
import movie from "../data/movies.data";
import { FilterMovies, MovieResults } from "../types";

export function fetchMovieData() {
  return axios
    .get<MovieResults>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    )
    .then((response) => response);
}

export function fetchMovieByTitle(title: string) {
  return axios
    .get<MovieResults>(
      `https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&language=en-US&page=1&include_adult=false`,
      {
        params: {
          query: title,
        },
      }
    )
    .then((response) => response);
}
