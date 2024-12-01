import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovieDetails } from "../Services/omdbApi";

const MovieCard = ({ movie, navigate }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movie.imdbID); // Fetch detailed movie info using imdbID
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie.imdbID]); // Re-run effect when imdbID changes

  if (loading) return <div>Loading...</div>;
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
      <h3 className="font-semibold text-xl">{movie.Title}</h3>
      <p className="text-sm">{movie.Year}</p>

      {/* Only display the Plot if movieDetails is loaded */}
      {movieDetails && movieDetails.Plot && (
        <p className="text-sm">{movieDetails.Plot}</p>
      )}
      <button
        onClick={() => navigate(`/movie/${movie.imdbID}`)}
        className="bg-blue-500 mt-2 px-4 py-2 rounded text-white"
      >
        View Details
      </button>
    </div>
  );
};

export default MovieCard;
