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
      setMovies(response.data);
    });
  }
  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movieList) => (
          <li key={movieList.title}>
            <h2>{movieList.title}</h2>
            <p>{movieList.releaseDate}</p>
            <p>{movieList.voteAverage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
