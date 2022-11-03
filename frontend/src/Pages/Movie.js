import React from "react";
import { useParams, useLocation} from "react-router-dom"

function Movie() {
  let { movieName } = useParams();
  const location = useLocation();

  return (
   // <div>THIS IS THE MOVIE PAGE FOR {movieName}</div>
    <div> 
          Title: {location.state.title} <br />
          
            {/* <img src={"http://image.tmdb.org/t/p/w92/" + location.state.poster_path} alt={""} class="fill"/><br /> */}
          <img src={"http://image.tmdb.org/t/p/w92/" + location.state.poster_path} class="movie-image"/><br />
          
          ID: {location.state.id } <br />
          
          Vote Average: {location.state.vote_average} <br />
          Overview: {location.state.overview} <br />
    </div>
  );

}

export default Movie;