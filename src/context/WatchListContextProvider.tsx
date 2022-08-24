import { useState } from "react";
import { Movie } from "../types";
import { WatchListContext } from "./WatchListContext";

interface Props {
  children: React.ReactNode;
}

export function WatchListContextProvider({ children }: Props) {
  const [watchList, setWatchList] = useState<Movie[]>([]);

  const addMovie = (movie: Movie) => {
    const movieIndex = watchList.findIndex(
      (movieObject) => movieObject.title === movie.title
    );
    if (movieIndex === -1) {
      setWatchList([...watchList, movie]);
    }
  };

  const removeMovie = (title: string) => {
    const movieIndex = watchList.findIndex(
      (movieObject) => movieObject.title === title
    );
    const updatedWatchList = [...watchList];
    updatedWatchList.splice(movieIndex, 1);
    setWatchList(updatedWatchList);
  };

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        addMovie,
        removeMovie,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
}
