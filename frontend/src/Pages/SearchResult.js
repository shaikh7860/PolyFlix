import React from "react";
import Table from "../Table.js";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

function SearchResult(props) {
  const navigate = useNavigate();
  if (!props.cookies.password) {
    navigate("/");
  }

function GoToHomePage(){
    window.location = '/home';   
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
    return (
      <div>
        <div>
          <nav>
            <NavBar handleSubmit={props.handleSubmit}></NavBar>
          </nav>
        </div>
        <div class="empty-search-text1">
          No results found for: {props.movieName}
        </div>
        <div class="empty-search-text2">
          Return to home page{" "}
          <input
            name="action"
            type="submit"
            value="Home"
            onclick= "GoToHomePage"
          />
        </div>
      </div>
    );
  }
}

export default SearchResult;
