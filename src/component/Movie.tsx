import { FilterMovies } from "../types";
import { fetchMovieData } from "../services/movies.service";
import { useEffect, useState } from "react";

export function Movies() {
  const [movies, setMovies] = useState<FilterMovies[]>([]);

  useEffect(() => {
    getAllMovies();
  }, []);

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response);
      setMovies(response.data);
    });
  }
  return (
    <div>
      <h1>Movies</h1>
    </div>
  );
}
