import { Slider } from "@mui/material";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {
  fetchFilteredMovies,
  fetchMovieByTitle,
  fetchMovieData,
} from "../services/movies.service";
import { Movie } from "../types";
import Box from "@mui/material/Box";
import { WatchListContext } from "../context/WatchListContext";

interface Props {
  setMovies: (movies: Movie[]) => void;
  getAllMovies: () => void;
}

export default function SearchBy({ setMovies, getAllMovies }: Props) {
  const [genre, setGenre] = useState([]);
  const [valueRatings, setValueRatings] = React.useState<number[]>([0, 10]);
  const [movieTitle, setMovieTitle] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [moviesPopular, setMoviesPopular] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>({} as Movie);
  const [showDetails, setShowDetails] = useState(false);
  const { addMovie, watchList } = useContext(WatchListContext);

  useEffect(() => {
    if (movieTitle === "") {
      getAllMovies();
    }
  }, [movieTitle]);

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue);
    setValueRatings(newValue as number[]);
  };

  // function handleSearch() {
  //   if (movieTitle === "") {
  //     handleFilteredSearch();
  //   } else {
  //     handleSearchMovie();
  //   }
  // }

  function handleSearchMovie() {
    console.log("SearchMovie");
    fetchMovieByTitle(movieTitle).then((response) => {
      console.log(response);
      setMovies(response.data.results);
    });
  }

  function getPopularMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }

  function handleFilteredSearch() {
    fetchFilteredMovies({
      rating_lte: valueRatings[1],
      rating_gte: valueRatings[0],
    }).then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }
  function showFilter() {
    setOpenFilter(!openFilter);
  }

  function showMovieDetails(movie: Movie) {
    setSelectedMovie(movie);
    setShowDetails(true);
  }

  return (
    <div className="">
      <div className="">
        <div className="h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between">
          <input
            className="appearance-none w-100% outline-none focus:outline-none active:outline-none"
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Search movies by title..."
          />

          <button
            onClick={() => handleSearchMovie()}
            className="ml-1 outline-none focus:outline-none active:outline-none"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
        <div className="flex justify-between align-center p-5">
          <button
            onClick={showFilter}
            className="bg-green-500 px-10 py-2 text-white rounded"
          >
            Get Movie Ratings ⭐️
          </button>
          <button
            onClick={getPopularMovies}
            className="bg-green-500 px-10 py-2 text-white rounded"
          >
            Get Popular Movies 🍿
          </button>
        </div>
      </div>

      {openFilter === true && (
        <div className="m-2">
          <div className="">
            <Box className="p-0.5">
              <p className="text-white m-0">Search by rating</p>
              <div className="">
                <Slider
                  getAriaLabel={() => "Movie rating"}
                  value={valueRatings}
                  onChange={handleChange}
                  min={0}
                  max={10}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
                <button
                  onClick={() => handleFilteredSearch()}
                  className="bg-green-500 px-2 rounded"
                >
                  Go
                </button>
              </div>
            </Box>
          </div>
          <div className=" m-7 table-c justify-around  ">
            <ul className="space-y-4 sm:grid sm:grid-cols-2 md:space-y-0 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {moviesPopular.map((popular) => (
                <li
                  className=" rounded-xl shadow-md p-10 space-y-4 h-70"
                  key={popular.title}
                >
                  <div className="">
                    <h2 className="text-xl font-bold truncate text-white">
                      {popular.title}
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
                    <p className="text-white">{popular.vote_average}</p>
                  </div>
                  {/* <p className="text-white"> {movieList.release_date}</p> */}
                  <img
                    className=" shadow-lg rounded-md "
                    src={
                      "https://image.tmdb.org/t/p/original/" +
                      popular.poster_path
                    }
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => showMovieDetails(popular)}
                      className=" shadow-lg border-2 rounded-sm border-none bg-green-500 px-3 py-1 text-white"
                    >
                      More Detail
                    </button>

                    <button
                      onClick={() => addMovie(popular)}
                      className=" border-2 rounded-sm border-none bg-green-400 px-3 py-1 text-white"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <div>
          <p>Search by genre</p>

          {genre.map((genreListings) => (
            <div>
              <input onChange={checkedGenre} type="checkbox" value="" />
              <input onChange={checkedGenre} type="checkbox" value="" />
              <input onChange={checkedGenre} type="checkbox" value="" />
              <input onChange={checkedGenre} type="checkbox" value="" />
              <input onChange={checkedGenre} type="checkbox" value="" />
              <input onChange={checkedGenre} type="checkbox" value="" />
            </div>
          ))}
        </div> */}
        </div>
      )}
    </div>
  );
}
