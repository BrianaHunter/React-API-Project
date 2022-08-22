import { Movie, MovieFilter, MovieResults } from "../types";
import { fetchMovieData } from "../services/movies.service";
import { useEffect, useState, useContext, Fragment } from "react";
import Modal from "react-modal";
import { IconX } from "@tabler/icons";
import SearchBy from "../component/SearchBy";
import { WatchListContext } from "../context/WatchListContext";
import { Link, useNavigate } from "react-router-dom";
import GetMoviesLogo from "../images/GetMoviesLogo.svg";
import Details from "../component/Details";
// import Dialog from "@mui/material/Dialog";
import { Dialog, Transition } from "@headlessui/react";
import { moveEmitHelpers } from "typescript";

const customStyles = {
  content: {
    // top: "20%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
    // width: "100%",
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
  // const [movieTitle, setMovieTitle] = useState("");
  const [showMovies, setShowMovies] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { addMovie, watchList } = useContext(WatchListContext);

  function isMovieInWatchList(movie: Movie) {
    return watchList.includes(movie);
  }

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

  function showMovieDetails(movie: Movie) {
    setSelectedMovie(movie);
    setShowDetails(true);
  }

  const navigate = useNavigate();

  function goToWatchListPage() {
    navigate("/watch-list");
  }
  //setting up closing the modal
  //added an onClick on the show details button in the return calling setShowDetails
  console.log("selctedMovie: ", selectedMovie);
  return (
    <div className="bg-gradient-to-tl from-black via-blue-900 to-black">
      <header className="pr-10 pt-10 flex justify-end">
        <Link to="/watch-list">
          <button className="py-2 px-4 bg-green-500 text-white rounded">
            Watch List
          </button>
        </Link>
      </header>
      <div className="flex justify-center">
        <img
          className="w-[500px] md:w-[900px] h-[200px] md:h-[350px] p-0 m-0"
          src={GetMoviesLogo}
        />
      </div>
      <div>
        <SearchBy setMovies={setMovies} getAllMovies={getAllMovies} />
      </div>

      <div className=" m-7 table-c justify-around  ">
        <ul className="space-y-4 sm:grid sm:grid-cols-2 md:space-y-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
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
                  onClick={() => showMovieDetails(movie)}
                  className=" shadow-lg border-2 rounded-sm border-none bg-green-500 px-3 py-1 text-white"
                >
                  More Detail
                </button>
                {/* <Transition appear show={showDetails} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-blue-900 bg-opacity-5" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Movie Details
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                <div>
                                
                                  {selectedMovie.title}
                                  {selectedMovie.vote_average}
                                  {selectedMovie.release_date}
                                  {selectedMovie.overview}
                                </div>
                               
                              </p>
                            </div>
                            <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                              >
                                Got it, thanks!
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition> */}
                {/* <Dialog onClose={closeModal} open={showDetails} fullScreen>
                  <Details movie={selectedMovie} />
                </Dialog> */}

                <button
                  onClick={() => addMovie(movie)}
                  className=" border-2 rounded-sm border-none bg-green-400 px-3 py-1 text-white"
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
          <IconX size={25} className="close-button" onClick={closeModal} />
          <div className="flex column">
            <div>
              <img
                className=" w-[500]  h-[500] p-0 m-0"
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  selectedMovie.poster_path
                }
              />
            </div>

            <div className="">
              <p className="">{selectedMovie.title}</p>
              <p> {selectedMovie.vote_average}</p>
              <p> {selectedMovie.release_date}</p>
              <p>{selectedMovie.overview}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
