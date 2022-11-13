import React from "react";
import { useNavigate } from "react-router-dom";

function getMonth(monthNum) {
  let month = "";
  if (monthNum == "01") {
    month = "January";
  }
  else if (monthNum == "02") {
    month = "February";
  }
  else if (monthNum == "03") {
    month = "March";
  }
  else if (monthNum == "04") {
    month = "April";
  }
  else if (monthNum == "05") {
    month = "May";
  }
  else if (monthNum == "06") {
    month = "June";
  }
  else if (monthNum == "07") {
    month = "July";
  }
  else if (monthNum == "08") {
    month = "August";
  }
  else if (monthNum == "09") {
    month = "September";
  }
  else if (monthNum == "10") {
    month = "October";
  }
  else if (monthNum == "11") {
    month = "November";
  }
  else if (monthNum == "12") {
    month = "December";
  }
  else {
    month = "Undefined"
  }
  return month;
}

function formatDate(date) {
  const tokensArr = date.split("-");
  let month = getMonth(tokensArr[1]);
  let newDate = month + " " + tokensArr[2] + ", " + tokensArr[0];
  return newDate;
}

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
                  overview: movie.overview,
                  release_date: formatDate(movie.release_date),
                  popularity: movie.popularity
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

