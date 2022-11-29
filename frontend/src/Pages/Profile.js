import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import { useNavigate, Link } from "react-router-dom";
import MovieList from "../MovieList";
import { useCookies } from "react-cookie";

function Profile(props) {
  const navigate = useNavigate();
  const [favmovies, setFavMovies] = useState([]);
  const [cookies, setCookie] = useCookies("name", "username", "password", "id");
  if (!cookies.password) {
    navigate("/");
  }
  useEffect(() => {
    console.log(cookies.id);
    props.getFavMovies(cookies.id).then((result) => {
      if (result) {
        console.log(result);
        setFavMovies(result);
      }
    });
  }, []);
  return (
    <div class = "container-fluid bg_image1">
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>
      <div class="profile-page">

        <div class="profile-header">PROFILE</div>

        {/* <div class="log-out-button">
          <input type="button" value="Sign out" onClick={props.logOut} />
        </div> */}

        <div class="profile-username">
          <br></br>
          {/* <span class="profile-name-header">Name: </span> {props.cookies.name} */}
          <div class="profile-username-header">&nbsp;Username: </div>{" "}
          <span class="profile-username-text">{cookies.username}</span>
          <div class="log-out-button">
            <input type="button" value="Sign out" onClick={props.logOut} />
          </div>
          {/* <br></br>
          <br></br> */}
        </div>

      <div className="favorites-section">
        <div className = "favorites-text"><strong>&nbsp;&nbsp;&nbsp;&nbsp;Your Favorites</strong> </div> 
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList movieData={favmovies} />
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

        {/* <div class="recent-reviews">
          <div class="recent-reviews-header">Recent Reviews</div>
        </div> */}

      </div>
    </div>
  );
}

export default Profile;