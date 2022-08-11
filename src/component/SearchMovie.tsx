import React from "react";
import { useState } from "react";
import { config } from "../config";

export default function SearchMovie() {
  const [search, setSearch] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const SearchMovie = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearch(true);
    const url = `https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key=${config.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMessage("Yeah, we found your movie.");
      setMovies(data.Search);
      setSearch(false);
    } catch (err) {
      setMessage("Noooooo, we couldn't find your movie. How sad for you.");
      setSearch(false);
    }
  };

  return (
    <div className="container mx-auto pt-6">
      <div className="flex justify-center max-w-screen-sm mx-auto overflow-hidden px-10">
        <form
          className="w-full h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative"
          onSubmit={SearchMovie}
        >
          <input
            type="text"
            name="query"
            placeholder="Search movies by name..."
            className="appearance-none w-full outline-none focus:outline-none active:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="ml-1 outline-none focus:outline-none active:outline-none"
            onClick={SearchMovie}
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
        </form>
      </div>
    </div>
  );
}
