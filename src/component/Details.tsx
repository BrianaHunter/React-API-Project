import { fetchMovieData } from "../services/movies.service";
import { useContext, useState } from "react";
import { WatchListContext } from "../context/WatchListContext";
import { Movie, MovieResults } from "../types";
import { Movies } from "../pages/Movies";
import movie from "../data/movies.data";
import { defaultMaxListeners } from "events";

export default function Details() {
  const [details, setDetails] = useState<Movie[]>([]);
  const { watchList, addMovie, removeMovie } = useContext(WatchListContext);
  const [showDetails, setShowDetails] = useState(false);

  const [deets, setDeets] = useState<Movie>({
    id: 0,
    title: "",
    vote_average: 0,
    release_date: "",
    poster_path: "",
    overview: "",
  });

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setDetails(response.data.results);
    });
  }

  return (
    <div>
      <form>
        <div className="input title-input-container">
          <label htmlFor="title">Title</label>
          <p>{}</p>

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
