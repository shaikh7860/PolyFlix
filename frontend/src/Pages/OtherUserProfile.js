import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import MovieList from "../MovieList";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

function OtherUserProfile(props) {
  const navigate = useNavigate();
  const [favmovies, setFavMovies] = useState([]);
  const [cookies, setCookie] = useCookies("password");
  if (!cookies.password) {
    navigate("/");
  }
  const location = useLocation();
  return (
    <div>
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>
      <div class="profile-page">
        <div class="profile-header">PROFILE</div>

        <div class="profile-username">
          {/* <span class="profile-name-header">Name: </span> {props.userinfo.name} */}
          <div class="profile-username-header">Username: </div>{" "}
          {location.state.username}
          <br></br>
          <br></br>
        </div>

        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Favorites</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList movieData={location.state.favmovies} />
            </div>
          </div>
        </div>
        <br></br>

        <div class="recent-reviews">
          <div class="recent-reviews-header">Recent Reviews</div>
        </div>
      </div>
    </div>
  );
}

export default OtherUserProfile;
