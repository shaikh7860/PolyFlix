import React from "react";
import { useParams, useLocation} from "react-router-dom"
import Button from "react-bootstrap/Button";


function Movie() {
  let { movieName } = useParams();
  const location = useLocation();

  function dosomething(val){
    console.log(val);
  }

  return (
   // <div>THIS IS THE MOVIE PAGE FOR {movieName}</div>
    <div>

      <div class = "float-container1">

        <div class = "title-format"> {location.state.title} <br /> </div>

        <div class="add-to-favorites-button">
          <Button variant="danger" onClick="dosomething(this.value)">
            Add to Favorites
          </Button>
        </div>

        <div class = "float-child1">
          <img src={"http://image.tmdb.org/t/p/w342/" + location.state.poster_path} class="movie-image"/><br />
        </div>

        <div class = "float-child2">  
          <div class = "description-header"> Description: </div> 
          <div class = "description-body"> {location.state.overview} <br /> </div>  <br /> 
          <div class = "movie-description"> <strong> Year: </strong> {location.state.id} </div> 
          <div class = "movie-description"> <strong> Rating: </strong> {location.state.id} </div> 
          <div class = "movie-description"> <strong> Duration: </strong> {location.state.id} </div> 
        </div>

          {/* ID: {location.state.id } <br />
          Vote Average: {location.state.vote_average} <br /> */}
        
      </div>
    </div>
  );

}

export default Movie;