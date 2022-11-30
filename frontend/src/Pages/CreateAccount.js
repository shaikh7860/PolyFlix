import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

function CreateAccount(props) {
  const [token, setToken] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState();

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

  async function submitForm() {
    const response = await props.handleSubmit(token);
    if (response === 400) setError("Invalid username or password");
    if (response === 500) setError("Username already taken");
    setToken({ name: "", username: "", password: "" });
  }

  return (
    <div>
      <div class="logo-image-big">
        <img src={logo} alt={""} class="img-fluid"></img>
      </div>
      <div class="login-box">
        {error ? <label>{error}</label> : null}
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
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}

export default CreateAccount;
