import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movieCard">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movieCard__info">
        <h4>{movie.title || movie.name}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
