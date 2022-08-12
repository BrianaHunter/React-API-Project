//holds movie list
//think movies array and watchlist array - you can have add to watchlist and remove function
//setmovies function to update full list of movies that you show to user

import { createContext, useState } from "react";
import { MovieResults, FilterMovies } from "../types";

interface MovieContextModel {
  movieList: MovieResults[];
  addMovie: (movie: MovieResults) => void;
  removeMovie: (title: string) => void;
}

const defaultContextValues: MovieContextModel = {
  movieList: [],
  addMovie: () => {},
  removeMovie: () => {},
};

export const MovieContext =
  createContext<MovieContextModel>(defaultContextValues);

interface Props {
  children: React.ReactNode;
}

export function MovieContextProvider({ children }: Props) {
  const [movieList, setMovieList] = useState<MovieResults[]>([]);

  function addMovie(movie: MovieResults) {
    setMovieList([movie, ...movieList]);
  }

  function removeMovie(title: string) {
    setMovieList(movieList.filter((movie) => movie.results !== movie.results));
  }

  return (
    <MovieContext.Provider value={{ movieList, addMovie, removeMovie }}>
      {children}
    </MovieContext.Provider>
  );
}
