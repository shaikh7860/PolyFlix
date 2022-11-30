import React from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

function ErrorPage(props) {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
  };
  return (
    <div class="container-fluid bg_image2">
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>
      <div class="invalid-url-page">
        <div class="invalid-url-text">Invalid URL {props.movieName}</div>
        <div class="empty-search-text2">
          <button onClick={navigateHome}>Return to the home page</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
