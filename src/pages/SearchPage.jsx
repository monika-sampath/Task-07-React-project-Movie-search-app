import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import MovieList from "../Components/MovieList";
import Pagination from "../Components/Pagination";
import { fetchMovies } from "../Services/omdbApi";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (query, type) => {
    try {
      const data = await fetchMovies(query, 1, type);
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10));
        setQuery(query);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch {
      setError("Failed to fetch movies.");
    }
  };

  const handlePageChange = async (page) => {
    const data = await fetchMovies(query, page);
    setMovies(data.Search);
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col justify-around gap-5 py-5">
      <SearchBar onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
