import { FilterMovies, MovieResults } from "../types";
import { fetchMovieByTitle, fetchMovieData } from "../services/movies.service";
import { useEffect, useState } from "react";

export function Movies() {
  const [movies, setMovies] = useState<FilterMovies[]>([]);
  const [movie, setMovie] = useState<FilterMovies>();
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    getAllMovies();
  }, []);

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }

  function handleTitleSearch() {
    fetchMovieByTitle(movieTitle).then((response) => setMovie(response.data));
  }

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-7xl font-bold  text-green-400">GET.</h1>
        <h1 className="text-7xl font-bold  text-black">Movies</h1>
      </div>
      <div className="">
        <input className="border-2" type="text" placeholder="search movie" />
        <input className="border-2" type="text" placeholder="search by date" />
        <button className=" bg-slate-400 px-5 py-2">Search</button>
      </div>

      <h2 className="">Movies To Watch</h2>

      <div>
        <ul>
          {movies.map((movieList) => (
            <li key={movieList.title}>
              <div className="">
                <h3>Title: {movieList.title}</h3>
                <p>Rating: {movieList.vote_average}</p>
              </div>

              <p>Release Date: {movieList.release_date}</p>
              <img src={movieList.poster_path} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
