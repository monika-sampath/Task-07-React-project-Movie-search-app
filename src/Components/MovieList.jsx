import React from "react";
import MovieCard from "./MovieCard";
import { useNavigate, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
    const navigate = useNavigate();
  if (!movies || movies.length === 0) {
    return <p className="text-center">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} navigate={navigate} />
      ))}
    </div>
  );
};

export default MovieList;
