import React from "react";
import { useNavigate } from "react-router-dom";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th>
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
        <td>{row.id}</td>
        <td>{row.title}</td>
        <td>{row.vote_average}</td>
        <td>
          <img
            src={"http://image.tmdb.org/t/p/w92/" + row.poster_path}
            alt={""}
          />
        </td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
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
                  overview: row.overview
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
