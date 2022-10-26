import React from "react";
import { useParams} from "react-router-dom"

function Movie() {
  let { movieName } = useParams();

  return (
    <div>THIS IS THE MOVIE PAGE FOR {movieName}</div>
  );

}

export default Movie;