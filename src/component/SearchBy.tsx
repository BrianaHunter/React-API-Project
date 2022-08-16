import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import movie from "../data/movies.data";
import { fetchMovieData, fetchRatings } from "../services/movies.service";
import { Movie, MovieRating, MovieResults } from "../types";
import { Movies } from "./Movies";

export default function SearchBy() {
  const [ratings, setRatings] = useState();
  const [rates, setRates] = useState(0);
  const [genre, setGenre] = useState([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  // useEffect(() => {
  //   if (ratings) {
  //     handleRating();
  //   }
  // }, [setRatings]);

  function getAllMovies() {
    fetchMovieData().then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }

  function handleRating() {
    fetchRatings().then((response) => {
      setMovies(response.data.results);
    });
  }

  function getByRatings() {
    // setRatings();
    // console.log(handleRating);
  }

  //   return (
  //     <div>
  //       <h3>Filter Movies</h3>

  //       <div>
  //         <p>Search by genre</p>

  //         {genre.map((genreListings) => (
  //           <div>
  //             <input onChange={checkedGenre} type="checkbox" value="" />
  //             <input onChange={checkedGenre} type="checkbox" value="" />
  //             <input onChange={checkedGenre} type="checkbox" value="" />
  //             <input onChange={checkedGenre} type="checkbox" value="" />
  //             <input onChange={checkedGenre} type="checkbox" value="" />
  //             <input onChange={checkedGenre} type="checkbox" value="" />
  //           </div>
  //         ))}
  //       </div>

  //       <div>
  //         <p>Search by rating</p>
  //         <Slider
  //           getAriaLabel={() => ""}
  //           value={ratings}
  //           onChange={getByRatings}
  //           valueLabelDisplay="auto"
  //         />
  //       </div>
  //     </div>
  //   );
  // }
}
