import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import MovieList from "../MovieList";
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
    props.getFriends(cookies.id).then((result) => {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (location.state.id === result[i]._id) {
            console.log("match found");
            setFriendButtonText("Friend!");
            changeDisabled(true);
          }
        }
      }
    });
  }, []);

  function handleFriends(user) {
    props.addFriend(user);
    console.log(user);
    setFriendButtonText("Friend!");
    changeDisabled(true);
  }

  return (
    <div>
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>
      <div class="profile-page">
        <div class="profile-header">{location.state.name}'s PROFILE</div>

        <div class="profile-user-button-row">
          <div class="profile-username">
            {/* <span class="profile-name-header">Name: </span> {props.userinfo.name} */}
            <div class="profile-username-header">Username: </div>{" "}
            {location.state.username}
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
        </div>
        <br></br>

        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Favorites</strong>
        <div class="magic-wrapper">
          <div className="container-fluid movie-app">
            <div className="row">
              <MovieList movieData={location.state.favmovies} />
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
                state: { id: location.state.id },
              })
            }
          />
        </div>
        <br></br>
        <br></br>
        <br></br>

        <div class="recent-reviews">
          <div class="recent-reviews-header">Recent Reviews</div>
        </div>
      </div>
    </div>
  );
}

export default OtherUserProfile;
