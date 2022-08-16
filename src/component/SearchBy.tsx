import { Slider } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import movie from "../data/movies.data";
import {
  fetchFilteredMovies,
  fetchMovieByTitle,
  fetchMovieData,
} from "../services/movies.service";
import { Movie, MovieFilter, MovieResults } from "../types";
import { Movies } from "./Movies";
import Box from "@mui/material/Box";

interface Props {
  setMovies: (movies: Movie[]) => void;
  getAllMovies: () => void;
}

export default function SearchBy({ setMovies, getAllMovies }: Props) {
  const [genre, setGenre] = useState([]);
  const [valueRatings, setValueRatings] = React.useState<number[]>([0, 10]);
  const [movieTitle, setMovieTitle] = useState("");

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

  // useEffect(() => {
  //   if (ratings) {
  //     handleRating();
  //   }
  // }, []);

  return (
    <div>
      <div className="w-200 h-10 m-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
        <input
          className="appearance-none w-200 outline-none focus:outline-none active:outline-none"
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Search movies by name..."
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

      <div>
        <Box sx={{ width: "100%", padding: 5, margin: 0 }}>
          <p>Search by rating</p>
          <Slider
            getAriaLabel={() => "Movie rating"}
            value={valueRatings}
            onChange={handleChange}
            min={0}
            max={10}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
    </div>
  );
}
