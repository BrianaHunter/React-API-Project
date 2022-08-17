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
    setOpenFilter(true);
  }
  function hideFilter() {
    setOpenFilter(false);
  }
  return (
    <div>
      <div className="">
        <div className="w-200 h-10 m-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
          <input
            className="appearance-none w-200 outline-none focus:outline-none active:outline-none"
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
        <div className="flex justify-center">
          <button
            onClick={showFilter}
            onDoubleClick={hideFilter}
            className="bg-blue-900 px-20 text-white rounded"
          >
            Filter more
          </button>
        </div>
        {/* <div
          className="w-0 h-0 
   border-l-[15px] border-l-transparent
   border-t-[15px] border-t-white
   border-r-[15px] border-r-transparent
    "
        ></div> */}
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
      {openFilter === true && (
        <div className="border-2 border-red-600">
          <div>
            <Box className=" w-600 p-5 m-0">
              <p className="text-white m-0">Search by rating</p>
              <div className="flex justify-between">
                <Slider
                  // className="w-200"
                  getAriaLabel={() => "Movie rating"}
                  value={valueRatings}
                  onChange={handleChange}
                  min={0}
                  max={10}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
                <button className="bg-green-500 px-2 rounded">Go</button>
              </div>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}
