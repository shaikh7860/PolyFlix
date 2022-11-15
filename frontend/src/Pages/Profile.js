import React from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import MovieList from "../MovieList";

function Profile(props) {
  const navigate = useNavigate();
  if (!props.cookies.password) {
    navigate("/");
  }

  return (
    <div>
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>
      <div class="profile-page">
        <div class="profile-header">PROFILE</div>

        <div class="profile-username">
          {/* <span class="profile-name-header">Name: </span> {props.cookies.name} */}
          <div class="profile-username-header">Username: </div>{" "}
          {props.cookies.username}
          <br></br>
          <br></br>
        </div>

        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Popular Movies</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList movieData={props.PopMovieData} />
            </div>
          </div>
        </div>
        <br></br>

        <div class="recent-reviews">
          <div class="recent-reviews-header">Recent Reviews</div>
        </div>

        <div class="log-out-button">
          <input type="button" value="Log Out" onClick={props.logOut} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
