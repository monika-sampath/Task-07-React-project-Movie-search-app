import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../Services/omdbApi";
import { useNavigate, useLocation } from "react-router-dom";

const MovieDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details.");
      }
    };

    loadMovie();
  }, [id]);

  if (error) return <p>{error}</p>;

  if (!movie) return <p>Loading...</p>;
  return (
    <div className="p-4">
      <img src={movie.Poster} alt={movie.Title} className="w-full max-w-md" />
      <h2 className="text-2xl font-bold">{movie.Title}</h2>
      <p className="text-xl">{movie.Plot}</p>
      <p className="text-xl">{movie.Year}</p>
      <p className="text-xl">{movie.Genre}</p>
      <p className="text-xl">{movie.Actors}</p>
      <p className="mt-2">Rating: {movie.imdbRating}</p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Back to Search
      </button>
    </div>
  );
};

export default MovieDetail;
