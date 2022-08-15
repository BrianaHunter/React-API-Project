import { Slider } from "@mui/material";
import { useState } from "react";
import movie from "../data/movies.data";
import { fetchMovieData } from "../services/movies.service";
import { Movie, MovieResults } from "../types";

// import { Movies } from "./Movies";

export default function SearchBy() {
  const [ratings, setRatings] = useState<Movie[]>([]);
  const [genre, setGenre] = useState([]);

  function handleRating() {
    fetchMovieData().then((response) => {
      setRatings(response.data.results);
    });

  function getByRatings() {
    setRatings();
    // console.log(handleRating);
  };

  

  return (
    <div>
      <h3>Filter Movies</h3>

      <div>
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
      </div>

      <div>
        <p>Search by rating</p>
        <Slider
          getAriaLabel={() => ""}
          value={ratings}
          onChange={getByRatings}
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
}
