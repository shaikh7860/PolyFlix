import React from "react";
import { useNavigate } from "react-router-dom";

const MovieList = (props) => {
  const navigate = useNavigate();
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
            onClick={() =>
              navigate("/movie/" + movie.title, {
                state: {
                  id: movie.id,
                  title: movie.title,
                  vote_average: movie.vote_average,
                  poster_path: movie.poster_path,
                },
              })
            }
          />
          {/* <button onClick={() => navigate("/movie/" + movie.title, {state: {id: movie.id, title: movie.title, vote_average: movie.vote_average, poster_path: movie.poster_path}}) }>View Info</button> */}
        </div>
      ))}
    </>
  );
};

export default MovieList;
