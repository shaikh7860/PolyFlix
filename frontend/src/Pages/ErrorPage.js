import React from "react";
import NavBar from "../NavBar";



function ErrorPage(props) {
  return (
  <div>
        <div>
          <nav>
            <NavBar handleSubmit={props.handleSubmit}></NavBar>
          </nav>
        </div>
        <div class="invalid-url-text">
          Invalid URL {props.movieName}
        </div>
        <div class="empty-search-text2">
        <a href="https://www.google.com/">Return to the home page</a>
          {/* <input
            name="action"
            type="submit"
            value="Home"
            onclick= "GoToHomePage"
          /> */}
        </div>
      </div>
  );
}

export default ErrorPage;