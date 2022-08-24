import { Movie } from "../types";
import { fetchMovieData } from "../services/movies.service";
import { useState, useContext } from "react";
import Modal from "react-modal";
import { IconX } from "@tabler/icons";
import SearchBy from "../component/SearchBy";
import { WatchListContext } from "../context/WatchListContext";
import { Link, useNavigate } from "react-router-dom";
import GetMoviesLogo from "../images/GetMoviesLogo.svg";

const customStyles = {
  content: {
    // top: "50%",
    // left: "50%",
    // right: "50%",
    // bottom: "50%",
    // marginRight: "-50%",
    transform: "translate(15%, 15%)",
    width: "80%",
    borderRadius: "10px",
    boxShadow: "3px 3px 5px darkgreen",
    // height: "100%",
    // padding: "50px",
    // background: "#79c5e8",
    // border: "2px solid black",
    // background: "transparent",

    backgroundImage: "linear-gradient(to top left, var(--tw-gradient-stops))",
  },
};

Modal.setAppElement("#root");

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>({} as Movie);
  const [showMovies, setShowMovies] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { addMovie, watchList } = useContext(WatchListContext);

  // function isMovieInWatchList(movie: Movie) {
  //   return watchList.includes(movie);
  // }

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }

  // function showList() {
  //   setShowMovies(true);
  // }

  function closeModal() {
    setShowDetails(false);
  }

  function showMovieDetails(movie: Movie) {
    setSelectedMovie(movie);
    setShowDetails(true);
  }

  // const navigate = useNavigate();

  // function goToWatchListPage() {
  //   navigate("/watch-list");
  // }

  console.log("selctedMovie: ", selectedMovie);
  return (
    <div>
      <div className="flex justify-end p-5">
        <Link to="/watch-list">
          <button className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 selection:bg-gray-200">
            Watch List
          </button>
        </Link>
      </div>

      <div className="flex justify-center m-1">
        <img
          className="w-[500px] md:w-[900px] h-[200px] md:h-[350px] p-0 m-0"
          src={GetMoviesLogo}
        />
      </div>

      <header className="pr-10 pt-10 flex justify-center">
        <div className="px-5 w-[1000px] m-0">
          <SearchBy setMovies={setMovies} getAllMovies={getAllMovies} />
        </div>
      </header>

      <div className=" m-7 table-c justify-around  ">
        <ul className="space-y-4 sm:grid sm:grid-cols-2 md:space-y-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <li
              className=" rounded-xl shadow-md p-10 space-y-4 h-70"
              key={movie.title}
            >
              <div className="">
                <h2 className="text-xl font-bold truncate text-white">
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

              <img
                className=" shadow-lg rounded-md "
                src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              />
              <div className="flex justify-between">
                <button
                  onClick={() => showMovieDetails(movie)}
                  className=" shadow-lg border-2 rounded-sm border-none bg-green-500 px-3 py-1 text-white hover:bg-green-700"
                >
                  More Detail
                </button>

                <button
                  onClick={() => addMovie(movie)}
                  className=" border-2 rounded-sm border-none bg-green-400 px-3 py-1 text-white hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Modal
          className="bg-gradient-to-tl from-black via-blue-900 to-black text-white"
          isOpen={showDetails}
          onRequestClose={closeModal}
          contentLabel="Post Form Modal"
          style={customStyles}
        >
          <div className="p-1.5 text-green-400 ">
            <IconX size={30} className="close-button" onClick={closeModal} />
          </div>

          <div className="flex column mb-15">
            <div className=" mb-5 mx-5 p-5">
              <img
                className="w-[900px] h-[100%] rounded-md"
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  selectedMovie.poster_path
                }
              />
            </div>

            <div className="p-5 m-0">
              <p className="p-2 text-xl font-bold truncate text-white">
                {selectedMovie.title}
              </p>
              <div className="flex">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <p className="text-white">{selectedMovie.vote_average}</p>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-calendar"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                  <line x1="16" y1="3" x2="16" y2="7"></line>
                  <line x1="8" y1="3" x2="8" y2="7"></line>
                  <line x1="4" y1="11" x2="20" y2="11"></line>
                  <line x1="11" y1="15" x2="12" y2="15"></line>
                  <line x1="12" y1="15" x2="12" y2="18"></line>
                </svg>
                <p className="p-2"> {selectedMovie.release_date}</p>
              </div>
              <p className="p-2">{selectedMovie.overview}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
