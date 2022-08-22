import { useContext, useState } from "react";
import { WatchListContext } from "../context/WatchListContext";
import { Movie } from "../types";
import Modal from "react-modal";
import { IconX } from "@tabler/icons";
import { Link } from "react-router-dom";
import WatchListLogo from "../images/WatchListLogo.svg";
import Details from "../component/Details";

interface MovieProps {
  movieItems: Movie;
}

Modal.setAppElement("#root");

export default function WatchListPage() {
  const { watchList, addMovie, removeMovie } = useContext(WatchListContext);
  const [showWatchlistMovie, setShowWatchlistMovie] = useState<Movie>(
    {} as Movie
  );
  const [showDetails, setShowDetails] = useState(false);

  function closeModal() {
    setShowDetails(false);
  }

  function showWatchlistDetail(movie: Movie) {
    setShowWatchlistMovie(movie);
    setShowDetails(true);
  }

  return (
    <div className="bg-gradient-to-tl from-black via-blue-900 to-black">
      <header className="p-4">
        <Link to="/">
          <button className="py-1 px-3 bg-green-500 text-white rounded">
            Home
          </button>
        </Link>
      </header>
      <div className="flex justify-center">
        <img
          className="w-[500px] md:w-[800px] h-[300px] md:h-[400px] "
          src={WatchListLogo}
        />
      </div>

      <div className=" m-7 table-c justify-around  ">
        <ul className="space-y-4 sm:grid sm:grid-cols-2 md:space-y-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchList.map((movie) => (
            <li
              className=" rounded-xl shadow-md p-10 space-y-4 h-70"
              key={movie.title}
            >
              <div className="">
                <h2 className=" text-xl font-bold truncate text-white">
                  {movie.title}
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
                <p className="text-white">{movie.vote_average}</p>
              </div>
              {/* <p className="text-white"> {movieList.release_date}</p> */}
              <img
                className=" shadow-lg rounded-md "
                src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              />

              <div className="flex justify-between">
                <button
                  onClick={() => showWatchlistDetail(movie)}
                  className=" shadow-lg border-2 rounded-sm border-none bg-green-500 px-3 py-1 text-white"
                >
                  More Detail
                </button>
                <button
                  onClick={() => removeMovie(movie.title)}
                  className=" border-2 rounded-sm border-none bg-green-400 px-3 py-1 text-white"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Modal
          isOpen={showDetails}
          onRequestClose={closeModal}
          contentLabel="Post Form Modal"
          className="bg-gradient-to-tl from-black via-blue-900 to-black text-white"
        >
          <IconX size={25} className="close-button" onClick={closeModal} />
          <div className="flex column">
            <div>
              <img
                className=" w-[500]  h-[500] p-0 m-0"
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  showWatchlistMovie.poster_path
                }
              />
            </div>

            <div className="">
              <p className="">{showWatchlistMovie.title}</p>
              <p> {showWatchlistMovie.vote_average}</p>
              <p> {showWatchlistMovie.release_date}</p>
              <p>{showWatchlistMovie.overview}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
