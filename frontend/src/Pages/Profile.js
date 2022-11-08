import React from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

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
      THIS IS THE PROFILE PAGE
      <div>Name: {props.cookies.name}</div>
      <div>Username: {props.cookies.username}</div>
      <div>
        <input type="button" value="Log Out" onClick={props.logOut} />
      </div>
    </div>
  );
}

export default Profile;
