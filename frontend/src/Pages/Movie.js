import React from "react";
// import { useParams, useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MDBTextArea } from 'mdb-react-ui-kit';


function Movie(props) {
  const navigate = useNavigate();
  // let { movieName } = useParams();
  const location = useLocation();
  if (!props.cookies.password) {
    navigate("/");
  }

  function dosomething(val){
    console.log(val);
  }

  

  return (
    // <div>THIS IS THE MOVIE PAGE FOR {movieName}</div>
    <div>

      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>

      <div class = "float-container1">
      
        <div class = "title-format"> {location.state.title} <br /> 
        <div class="add-to-favorites-button">
          <Button variant="danger" onClick="dosomething(this.value)">
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
          <div class = "movie-description"> <strong> Duration: </strong> {location.state.popularity} </div> 
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
