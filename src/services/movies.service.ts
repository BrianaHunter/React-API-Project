import axios from "axios";
import { FilterMovies } from "../types";

export function fetchMovieData() {
  return axios
    .get<FilterMovies[]>(
      "https://api.themoviedb.org/3/movie/550api_key=8089c024c707abbe7859b5b0f4671d05"
    )
    .then((response) => response);
}
