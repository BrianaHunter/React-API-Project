import { fetchMovieData } from "../services/movies.service";
import { useContext, useState } from "react";
import { WatchListContext } from "../context/WatchListContext";
import { Movie, MovieResults } from "../types";
import { Movies } from "../pages/Movies";
import movie from "../data/movies.data";
import { defaultMaxListeners } from "events";

interface Props {
  movie: Movie;
}

//movie prop you pass into it, use the title and stuff to display
export default function Details({ movie }: Props) {
  return (
    <div>
      <form>
        <div>
          {/* <label htmlFor="title">Title</label> */}
          <img></img>
          <p>{movie.title}</p>

          {/* <input
            id="title"
            className="title-input"
            type="text"
            value={Movies.title} */}
          {/* onChange={handleTitleChange} */}
          {/* /> */}
        </div>
      </form>
    </div>
  );
}
