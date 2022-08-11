import { FilterMovies, MovieResults } from "../types";
import { fetchMovieData } from "../services/movies.service";
import { useEffect, useState } from "react";

export function Movies() {
  const [movies, setMovies] = useState<FilterMovies[]>([]);

  useEffect(() => {
    getAllMovies();
  }, []);

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }
  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movieList) => (
          <li key={movieList.title}>
            <h2>{movieList.title}</h2>
            <p>{movieList.release_date}</p>
            <p>{movieList.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
