import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import MovieList from "../Components/MovieList";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";

function OtherUserProfile(props) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies("password");
  const [friendButtonText, setFriendButtonText] = useState("Add Friend");
  const [friendButtonDisabled, changeDisabled] = useState(false);
  if (!cookies.password) {
    navigate("/");
  }
  const location = useLocation();

  useEffect(() => {
    props.getFriends(location.state._id).then((result) => {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (location.state._id === result[i]._id) {
            setFriendButtonText("Friend!");
          }
        }
      }
    });
  }, []);

  function handleFriends(user) {
    props.addFriend(user);
    if (friendButtonText === "Add Friend") {
      setFriendButtonText("Friend!");
    } else {
      setFriendButtonText("Add Friend");
    }
  }

  return (
    <div class="container-fluid bg_image1">
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>
      <div class="profile-page">
        <div class="profile-header">{location.state.name}'s PROFILE</div>
        <div class="profile-username">
          <br></br>
          <div class="profile-username-header">&nbsp;Username: </div>{" "}
          <span class="profile-username-text">{location.state.username}</span>
          <div class="add-to-friends-button">
            <Button
              disabled={friendButtonDisabled}
              variant="danger"
              onClick={() => handleFriends(location.state)}
            >
              {friendButtonText}
            </Button>
          </div>
        </div>
        <br></br>

        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Favorites</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList
                movieData={location.state.favmovies}
                getMovieDetails={props.getMovieDetails}
              />
            </div>
          </div>
        </div>
        <br></br>

        <div class="friends-list">
          <input
            type="button"
            value={location.state.name + "'s Friends"}
            onClick={() =>
              navigate("/friendslist/" + location.state.username, {
                state: { id: location.state._id },
              })
            }
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default OtherUserProfile;
