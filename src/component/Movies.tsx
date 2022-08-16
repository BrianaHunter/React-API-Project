import { Movie, MovieFilter, MovieResults } from "../types";
import {
  fetchFilteredMovies,
  fetchMovieByTitle,
  fetchMovieData,
} from "../services/movies.service";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { IconX } from "@tabler/icons";
import SearchBy from "./SearchBy";

Modal.setAppElement("#root");

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const [movieTitle, setMovieTitle] = useState("");
  const [showMovies, setShowMovies] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  //KJ - added in show details useState to incorporate modal to have details pop up

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }

  function showList() {
    setShowMovies(true);
  }

  function closeModal() {
    setShowDetails(false);
  }
  //setting up closing the modal
  //added an onClick on the show details button in the return calling setShowDetails

  return (
    <div className="">
      <div className="flex justify-center mt-10">
        <h1 className="text-7xl font-bold  text-green-400">GET.</h1>
        <h1 className="text-7xl font-bold  text-black">Movies</h1>
      </div>
      <div>
        <SearchBy setMovies={setMovies} getAllMovies={getAllMovies} />
      </div>
      <div className=" m-7 table-c justify-around  ">
        <ul className="space-y-4 sm:grid sm:grid-cols-2 md:space-y-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movieList) => (
            <li
              className=" rounded-xl shadow-md p-10 space-y-4 h-70"
              key={movieList.title}
            >
              <div className="">
                <h3 className="font-bold truncate">{movieList.title}</h3>
                <p>Rating: {movieList.vote_average}</p>
              </div>

              <p> {movieList.release_date}</p>
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" + movieList.poster_path
                }
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowDetails(true)}
                  className=" border-2 rounded-sm border-none bg-green-400 px-3 py-1 text-white"
                >
                  More Detail
                </button>
                <Modal
                  isOpen={showDetails}
                  onRequestClose={closeModal}
                  contentLabel="Post Form Modal"
                >
                  <IconX
                    size={25}
                    className="close-button"
                    onClick={closeModal}
                  />
                </Modal>
                <button className=" border-2 rounded-sm border-none bg-green-400 px-3 py-1 text-white">
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
