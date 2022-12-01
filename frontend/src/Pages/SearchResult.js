import React from "react";
import Table from "../Components/Table.js";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function SearchResult(props) {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
  };
  const [cookies, setCookie] = useCookies("password");
  if (!cookies.password) {
    navigate("/");
  }

  if (props.movieData.length > 0) {
    return (
      <div classname="container-fluid bg_image">
        <nav>
          <NavBar handleSubmit={props.handleSubmit}></NavBar>
        </nav>
        <div class="search-result-text">
          Search results for: {props.movieName}
        </div>

        <Table
          movieData={props.movieData}
          characterData={props.characterData}
          getMovieDetails={props.getMovieDetails}
        />
      </div>
    );
  } else {
    return (
      <div class="container-fluid bg_image2">
        <nav>
          <NavBar handleSubmit={props.handleSubmit}></NavBar>
        </nav>
        <div class="invalid-url-page">
          <div class="invalid-url-text">
            No results found for: {props.movieName}
          </div>
          <div class="empty-search-text2">
            <button onClick={navigateHome}>Return to the home page</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
