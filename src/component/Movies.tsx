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
import Details from "../pages/Details";

Modal.setAppElement("#root");

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showMovies, setShowMovies] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  //use find method- create function that will take in movie id and find more in array then set movie to selected movie - onclick on more details button

  function displayMovieDetails() {}

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
    <div className="bg-gradient-to-tl from-black via-blue-900 to-black">
      <div className="flex justify-center pt-10">
        <h1 className="font-['Lemon-Days'] text-9xl font-bold  text-green-400">
          GET.
        </h1>
        <h1 className="text-9xl font-bold  text-white">Movies</h1>
      </div>

      <div className="">
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
                <h2 className=" text-xl font-bold truncate text-white">
                  {movieList.title}
                </h2>
              </div>
              <div className="flex">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <p className="text-white">{movieList.vote_average}</p>
              </div>
              {/* <p className="text-white"> {movieList.release_date}</p> */}
              <img
                className=" shadow-lg rounded-md "
                src={
                  "https://image.tmdb.org/t/p/original/" + movieList.poster_path
                }
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowDetails(true)}
                  className=" shadow-lg border-2 rounded-sm border-none bg-green-500 px-3 py-1 text-white"
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
                  <Details />
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
