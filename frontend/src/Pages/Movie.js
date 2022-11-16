import React from "react";
// import { useParams, useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MDBTextArea } from 'mdb-react-ui-kit';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';


const axios = require("axios");



function Movie(props) {
  
  const navigate = useNavigate();
  // let { movieName } = useParams();
  const location = useLocation();
  if (!props.cookies.password) {
    navigate("/");
  }

  async function getMovieTrailer(movieID) {
    console.log("inside func: " +movieID);
    
    const result = await axios.request(
      "https://api.themoviedb.org/3/movie/"+movieID+"/videos?api_key=" +
      "a4f5ca3d995fae36deb0e8691ab2d880"+"&language=en-US"+"&append_to_response=videos"
    );
    var str = JSON.stringify(result.data);
    console.log("after axios: " + str);
    console.log("FINAL: "+result.data.results[0].key)
    
    var y = result.data.results[0].key;
    console.log("Y: "+y);
    location.state.movieTrailer = String(result.data.results[0].key);
    console.log("MOVIE RUNTIME: "+ JSON.stringify(location.state));
  }

  getMovieTrailer(location.state.id)

  // code for implementing modal to play trailer video
  const [modalOpen, setModalOpen] = useState(false);

  


  return (
    // <div>THIS IS THE MOVIE PAGE FOR {movieName}</div>
    <div>

      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>

      <div class = "float-container1">
      
        <div class = "title-format"> {location.state.title} <br /> 
        <div class="add-to-favorites-button">
          <Button variant="danger" style={{ color: "red"}} onClick="dosomething(this.value)">
            Add to Favorites
          </Button>
        </div>
        
        
        </div>

        <div class = "float-child1">
          <img src={"http://image.tmdb.org/t/p/w342/" + location.state.poster_path} class="movie-image"/><br />
        </div>

        <div class = "float-child2">  
          <div class = "description-header"> Description: </div> 
          <div class = "description-body"> {location.state.overview} <br /> </div>  <br /> 
          <div class = "movie-description"> <strong> Release Date: </strong> {location.state.release_date} </div> <br /> 
          <div class = "movie-description"> <strong> Rating: </strong> {location.state.vote_average} </div> <br /> 
          {/* <div class = "movie-description"> <strong> Duration: </strong> {location.state.runtime} </div> <br /> */}
          
          {/* <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/QBmre1vaLwI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        </div>
       

          {/* ID: {location.state.id } <br />
          Vote Average: {location.state.vote_average} <br /> */}

        
      </div>

      {/* <div class = "user-reviews"> */}

        
          {/* <label for="Name">Name:</label> */}
          {/* <input type="text" id="Name" name="Name" size="50" placeholder="Jane Doe"/> */}
          {/* User Reviews1: */}

          {/* <div class = ".user-reviews-text-box">
          <label for="freeform"></label><br/>
            <textarea id="freeform" name="freeform" placeholder="Enter Review Here..." rows="4" cols="50"></textarea> <br/> <br/> */}

            {/* <MDBTextArea placeholder = 'Enter Review' id='textAreaExample' column= {2} rows={3} />
            <Button variant="primary" type="submit">
              Submit
            </Button> */}
        {/* </div> */}
      {/* </div> */}

      <div class="player-wrapper">
          <div class="trailer-label"> 
            <strong> Trailer: </strong> 
          </div>
          <ReactPlayer class="react-player" url={"https://www.youtube.com/watch?v="+location.state.movieTrailer} controls={true} />
      </div>

    <div class = "user-box">
      <div class = "user-reviews-header"> User Reviews: </div>

      <div class = ".user-reviews-text-box">
      <label for="freeform"></label><br/>
        <textarea id="freeform" name="freeform" placeholder="Enter Review Here..." rows="4" cols="50"></textarea> <br/> <br/>
      </div>
      <div class = "post-button"> <input value="Post" class="submit" type="button" onClick="dosomething(this.value);"/> </div>

  </div>

    </div>

  );
}

export default Movie;
