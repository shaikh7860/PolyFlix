import React from "react";
import Form from '../Form.js'
import Table from '../Table.js'
import MovieList from '../MovieList.js'

function Home(props) {
  return(
    // <div>
    //   THIS IS THE HOME PAGE

    //   {/* <Table movieData = {props.movieData} characterData={props.characterData} removeCharacter={props.removeCharacter} /> */}
    //   <MovieList movieData = {props.movieData} />
    //   <Form handleSubmit = {props.handleSubmit} />

    <div>
      <div class ="magic-wrapper">
        <div className='container-fluid movie-app'>
          <div className='row'>
            <MovieList movieData={props.movieData} />
          </div>
        </div>
      </div>
      <div class ="magic-wrapper">
        <div className='container-fluid movie-app'>
          <div className='row'>
            <MovieList movieData={props.movieData} />
          </div>
        </div>
      </div>
      <div class ="magic-wrapper">
        <div className='container-fluid movie-app'>
          <div className='row'>
            <MovieList movieData={props.movieData} />
          </div>
        </div>
      </div>
    </div>
    
  );
   
}

export default Home;
