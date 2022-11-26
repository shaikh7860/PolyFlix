import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

function Login(props) {
  const [token, setToken] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username")
      setToken({ username: value, password: token["password"] });
    else setToken({ username: token["username"], password: value });
  }

  function submitForm() {
    props.handleSubmit(token);
    setToken({ username: "", password: "" });
  }

  return (
    <div>
      <div class="logo-image-big">
        <img src={logo} alt={""} class="img-fluid"></img>
      </div>
      <div class="login-box">
        <form>
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
            <input type="button" value="Log in" onClick={submitForm} />
          </div>
        </form>
        <ul>
          <Link to="/createaccount">Create an account</Link>
        </ul>
      </div>
    </div>
  );
}

export default Login;
