import React from "react";
import { useNavigate } from "react-router-dom";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Title</th>
        <th>Rating</th>
        <th>Image</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
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
  const rows = props.movieData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.title}</td>
        <td>{row.vote_average}</td>
        <td>
          <img
            src={"http://image.tmdb.org/t/p/w92/" + row.poster_path}
            alt={""}
          />
        </td>
        <td>
          <button onClick={() => setMovieDetails(row)}>View Info</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <div class="container-fluid bg_image">
      <table>
        <TableHeader />
        <TableBody
          movieData={props.movieData}
          characterData={props.characterData}
          removeCharacter={props.removeCharacter}
          getMovieDetails={props.getMovieDetails}
        />
      </table>
    </div>
  );
}

export default Table;
