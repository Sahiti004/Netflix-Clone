import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=3a8ce5f2e85b47f62aca2099fc82d3cd`
      );
      const movies = response.data.results;
      setMovie(movies[0]);
    }

    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name}</h1>
        <p className="banner__description">
          {movie?.overview?.length > 150
            ? movie?.overview.substring(0, 150) + "..."
            : movie?.overview}
        </p>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">More Info</button>
        </div>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
