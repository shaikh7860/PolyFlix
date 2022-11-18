import React from "react";
import NavBar from "../NavBar";
import MovieList from "../MovieList.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home(props) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies("password");
  if (!cookies.password) {
    navigate("/");
  } else {
    return (
      // <div>
      //   THIS IS THE HOME PAGE

      //   {/* <Table movieData = {props.movieData} characterData={props.characterData} removeCharacter={props.removeCharacter} /> */}
      //   <MovieList movieData = {props.movieData} />
      //   <Form handleSubmit = {props.handleSubmit} />

      <div>
        <nav>
          <NavBar handleSubmit={props.handleSubmit}></NavBar>
        </nav>
        <br></br>
        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Popular Movies</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList movieData={props.PopMovieData} />
            </div>
          </div>
        </div>
        <br></br>
        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top Movies</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList movieData={props.TopMovieData} />
            </div>
          </div>
        </div>
        <br></br>
        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Upcoming Movies</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList movieData={props.UpcomingMovieData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
