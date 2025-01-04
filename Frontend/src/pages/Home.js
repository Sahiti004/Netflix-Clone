import React from "react";
import Row from "../components/Row";
import Banner from "../components/Banner";
import axios from "axios";

const Home = () => {
  const fetchUrl = "https://api.themoviedb.org/3/trending/all/week?api_key=3a8ce5f2e85b47f62aca2099fc82d3cd";

  return (
    <div>
      <Banner />
      <h1> Trending Now </h1>
      <Row fetchUrl={fetchUrl} />
    </div>
  );
};

export default Home;
