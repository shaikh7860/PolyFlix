import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

function CreateAccount(props) {
  const [token, setToken] = useState({
    name: "",
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username")
      setToken({
        name: token["name"],
        username: value,
        password: token["password"],
      });
    else if (name === "password")
      setToken({
        name: token["name"],
        username: token["username"],
        password: value,
      });
    else
      setToken({
        name: value,
        username: token["username"],
        password: token["password"],
      });
  }

  function submitForm() {
    props.handleSubmit(token);
    setToken({ name: "", username: "", password: "" });
  }

  return (
    <div>
      <div class="logo-image-big">
        <img src={logo} alt={""} class="img-fluid"></img>
      </div>
      <div class="login-box">
        <form>
          <label>
            <p>Name</p>
            <input
              type="text"
              name="name"
              id="name"
              value={token.name}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Username</p>
            <input
              type="text"
              name="username"
              id="username"
              value={token.username}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              id="password"
              value={token.password}
              onChange={handleChange}
            />
          </label>
          <div>
            <input type="button" value="Create Account" onClick={submitForm} />
          </div>
        </form>
        <ul>
          <Link to="/">Go back</Link>
        </ul>
      </div>
    </div>
  );
}

export default CreateAccount;
