import React from "react";
import { useLocation } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { state } = useLocation();
  const movie = state?.movie;

  if (!movie) {
    return <div>No movie data available.</div>;
  }

  return (
    <div className="movieDetails">
      <div
        className="movieDetails__banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="movieDetails__bannerContent">
          <h1>{movie.title || movie.name}</h1>
          <p>{movie.overview}</p>
          <button className="movieDetails__button play">Play</button>
        </div>
      </div>
      <div className="movieDetails__info">
        <h2>Details</h2>
        <p><strong>Release Date:</strong> {movie.release_date || movie.first_air_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        <p><strong>Genres:</strong> {movie.genre_ids?.join(", ") || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
