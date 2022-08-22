import { Slider } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import {
  fetchFilteredMovies,
  fetchMovieByTitle,
} from "../services/movies.service";
import { Movie } from "../types";
import Box from "@mui/material/Box";

interface Props {
  setMovies: (movies: Movie[]) => void;
  getAllMovies: () => void;
}

export default function SearchBy({ setMovies, getAllMovies }: Props) {
  const [genre, setGenre] = useState([]);
  const [valueRatings, setValueRatings] = React.useState<number[]>([0, 10]);
  const [movieTitle, setMovieTitle] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

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
        <div className="flex justify-center p-5">
          <div className="">
            <button
              onClick={showFilter}
              className="bg-blue-900 px-10 py-2 text-white rounded"
            >
              Filter
            </button>
          </div>
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
