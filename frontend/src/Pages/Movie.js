import React from "react";
// import { useParams, useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

function Movie(props) {
  const navigate = useNavigate();
  // let { movieName } = useParams();
  const location = useLocation();
  if (!props.cookies.password) {
    navigate("/");
  }

  return (
    // <div>THIS IS THE MOVIE PAGE FOR {movieName}</div>
    <div>
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>
      <div class="float-container">
        <div class="float-child1">
          <div class="title-format">
            {" "}
            {location.state.title} <br />{" "}
          </div>
          {/* <img src={"http://image.tmdb.org/t/p/w92/" + location.state.poster_path} alt={""} class="fill"/><br /> */}
          <img
            src={"http://image.tmdb.org/t/p/w92/" + location.state.poster_path}
            alt={""}
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
