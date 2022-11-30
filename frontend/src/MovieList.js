import movieTrailer from "movie-trailer";
import React from "react";
import { useNavigate } from "react-router-dom";

const MovieList = (props) => {
  const navigate = useNavigate();

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s).";
  }

  function setMovieDetails(movie) {
    var movieD = "Cannot Be Found";
    var movieB = "Cannot Be Found";
    props.getMovieDetails(movie.id).then((result) => {
      if (result.runtime !== 0) {
        movieD = timeConvert(result.runtime);
      }
      if (result.budget !== 0) {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        movieB = formatter.format(result.budget);
      }
      console.log(movieD);

      navigate("/movie/" + movie.title, {
        state: {
          id: movie.id,
          title: movie.title,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          overview: movie.overview,
          //release_date: movie.release_date,
          release_date: movie.release_date,
          popularity: movie.popularity,
          movieTrailer: null,
          movieDuration: movieD,
          movieBudget: movieB,
        },
      });
    });
  }

  return (
    <>
      {props.movieData.map((movie, index) => (
        <div
          key={movie.id}
          className="image-container d-flex justify-content-start flex-shrink-1 w-25 m-3"
        >
          <img
            src={"http://image.tmdb.org/t/p/w154/" + movie.poster_path}
            alt={"movie"}
            onClick={() => setMovieDetails(movie)}
          />
          {/* <button onClick={() => navigate("/movie/" + movie.title, {state: {id: movie.id, title: movie.title, vote_average: movie.vote_average, poster_path: movie.poster_path}}) }>View Info</button> */}
        </div>
      ))}
    </>
  );
};

export default MovieList;
