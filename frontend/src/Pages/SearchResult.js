import React from "react";
import Table from "../Table.js";
import NavBar from "../NavBar";
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

  function GoToHomePage() {
    window.location = "/home";
  }

  // if (props.movieData.length > 0) {
  //   return (
  //     <div>
  //       <nav>
  //         <NavBar handleSubmit={props.handleSubmit}></NavBar>
  //       </nav>
  //       Search results for: {props.movieName}
  //       <Table
  //         movieData={props.movieData}
  //         characterData={props.characterData}
  //       />
  //     </div>
  //   );
  // } else {
  if (props.movieData.length > 0) {
    return (
      <div class="bg_image_search">
        <nav>
          <NavBar handleSubmit={props.handleSubmit}></NavBar>
        </nav>
        <br></br>
        <strong>&nbsp;&nbsp;Search results for: {props.movieName} </strong>
        <br></br>
        <br></br>
        <Table
          movieData={props.movieData}
          characterData={props.characterData}
        />
      </div>
    );
  } else {
    return (
      // <div>
      //   <div class="invalid-url-text">
      //     No results found for: {props.movieName}
      //   </div>
      //   <div class="empty-search-text2">
      //     <a href="https://www.google.com/">Return to the home page!</a>
      //   </div>
      // </div>
      <div class="bg_image2">
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
