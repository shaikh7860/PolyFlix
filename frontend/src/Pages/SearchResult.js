import React from "react";
import Table from "../Table.js";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

function SearchResult(props) {
  const navigate = useNavigate();
  if (!props.cookies.password) {
    navigate("/");
  }

  if (props.movieData.length > 0) {
    return (
      <div>
        <nav>
          <NavBar handleSubmit={props.handleSubmit}></NavBar>
        </nav>
        Search results for: {props.movieName}
        <Table
          movieData={props.movieData}
          characterData={props.characterData}
        />
      </div>
    );
  } else {
    return <div>No results found for: {props.movieName}</div>;
  }
}

export default SearchResult;
