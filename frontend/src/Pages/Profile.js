import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate, Link } from "react-router-dom";
import MovieList from "../Components/MovieList";
import { useCookies } from "react-cookie";

function Profile(props) {
  const navigate = useNavigate();
  const [favmovies, setFavMovies] = useState([]);
  const [cookies, setCookie] = useCookies("name", "username", "password", "id");
  if (!cookies.password) {
    navigate("/");
  }
  useEffect(() => {
    props.getFavMovies(cookies.id).then((result) => {
      if (result) {
        setFavMovies(result);
      }
    });
  }, []);
  return (
    <div class="container-fluid bg_image1">
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>
      <div class="profile-page">
        <div class="profile-header">MY PROFILE</div>

        <div class="profile-username">
          <div class="log-out-button">
            <input type="button" value="Sign out" onClick={props.logOut} />
          </div>
          <div class="profile-username-header">&nbsp;Username: </div>{" "}
          <span class="profile-username-text">{cookies.username}</span>
          <br></br>
          <br></br>
        </div>

        <div className="favorites-section">
          <div className="favorites-text">
            <strong>&nbsp;&nbsp;&nbsp;&nbsp;Your Favorites</strong>{" "}
          </div>
          <div class="magic-wrapper">
            <div className="container-fluid movie-app">
              <div className="row">
                <MovieList
                  movieData={favmovies}
                  getMovieDetails={props.getMovieDetails}
                />
              </div>
            </div>
          </div>

          <div class="friends-list">
            <input
              type="button"
              value="My Friends"
              onClick={() =>
                navigate("/friendslist/" + cookies.username, {
                  state: { id: cookies.id },
                })
              }
            />
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Profile;
