//holds movie list
//think movies array and watchlist array - you can have add to watchlist and remove function
//setmovies function to update full list of movies that you show to user

import { createContext, useState } from "react";
import { MovieResults, Movie } from "../types";

interface WatchListContextModel {
  watchList: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (title: string) => void;
}

export const WatchListContext = createContext<WatchListContextModel>({
  watchList: [],
  addMovie: () => {},
  removeMovie: () => {},
});
