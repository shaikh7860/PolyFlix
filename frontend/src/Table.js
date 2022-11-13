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

  console.log(props.movieData);
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
          <button
            onClick={() =>
              navigate("/movie/" + row.title, {
                state: {
                  id: row.id,
                  title: row.title,
                  vote_average: row.vote_average,
                  poster_path: row.poster_path,
                  overview: row.overview,
                  runtime: row.runtime,
                  release_date: formatDate(row.release_date)
                },
              })
            }
          >
            View Info
          </button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        movieData={props.movieData}
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;
