import React from "react";
import { useParams, useLocation } from "react-router-dom";

function Movie() {
  let { movieName } = useParams();
  const location = useLocation();

  return (
    // <div>THIS IS THE MOVIE PAGE FOR {movieName}</div>
    <div>
      <div class="float-container">
        <div class="float-child1">
          <div class="title-format">
            {" "}
            {location.state.title} <br />{" "}
          </div>
          {/* <img src={"http://image.tmdb.org/t/p/w92/" + location.state.poster_path} alt={""} class="fill"/><br /> */}
          <img
            src={"http://image.tmdb.org/t/p/w92/" + location.state.poster_path}
            class="movie-image"
          />
          <br />
        </div>

        <div class="float-child2">
          <div class="overview-text">
            <div class="description-text"> Description: </div>{" "}
            {location.state.overview} <br />
          </div>
          ID: {location.state.id} <br />
          Vote Average: {location.state.vote_average} <br />
        </div>
      </div>
    </div>
  );
}

export default Movie;
