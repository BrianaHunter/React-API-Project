import React, { useState } from "react";
import FilterMovies from "../component/SearchBy";
import movie from "../data/movies.data";
import { fetchMovieData } from "../services/movies.service";
import { Movie } from "../types";

export default function Details() {
  const [details, setDetails] = useState<Movie[]>([]);

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setDetails(response.data.results);
    });
  }

  return <div></div>;
}
//hmmm, trying to figure out getting the overview.
