import axios from "axios";
import { config } from "../config";
import { FilterMovies, MovieResults } from "../types";

export function fetchMovieData() {
  return axios
    .get<FilterMovies[]>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    )
    .then((response) => response);
}
