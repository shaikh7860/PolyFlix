import React from "react";
import "../App.css";
import NavBar from "../Components/NavBar";
import MovieList from "../Components/MovieList.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../Images/moviedatabaselogo.svg";

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
      <div class="bg_image1">
        <nav>
          <NavBar handleSubmit={props.handleSubmit}></NavBar>
        </nav>
        <br></br>
        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Popular Movies</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList
                movieData={props.PopMovieData}
                getMovieDetails={props.getMovieDetails}
              />
            </div>
          </div>
        </div>
        <br></br>
        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top Movies</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList
                movieData={props.TopMovieData}
                getMovieDetails={props.getMovieDetails}
              />
            </div>
          </div>
        </div>
        <br></br>
        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Upcoming Movies</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList
                movieData={props.UpcomingMovieData}
                getMovieDetails={props.getMovieDetails}
              />
            </div>
          </div>
        </div>
        <div>
          <br></br>
          <i>&nbsp;&nbsp;Movie database provided by:&nbsp;&nbsp;&nbsp;</i>
          <object data={logo} width="250" height="20"></object>
        </div>
      </div>
    );
  }
}

export default Home;
