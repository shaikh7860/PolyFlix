import React from "react";
import Form from "../Form.js";
import Table from "../Table.js";
import MovieList from "../MovieList.js";

function Home(props) {
  return (
    // <div>
    //   THIS IS THE HOME PAGE

    //   {/* <Table movieData = {props.movieData} characterData={props.characterData} removeCharacter={props.removeCharacter} /> */}
    //   <MovieList movieData = {props.movieData} />
    //   <Form handleSubmit = {props.handleSubmit} />

    <div>
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

export default Home;
