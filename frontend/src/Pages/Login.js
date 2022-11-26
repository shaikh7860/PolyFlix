import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

function Login(props) {
  const [token, setToken] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState();

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username")
      setToken({ username: value, password: token["password"] });
    else setToken({ username: token["username"], password: value });
  }

  async function submitForm() {
    const result = await props.handleSubmit(token);
    console.log(result);
    if (!result) {
      setError("Invalid login. Please try again.");
    }
    setToken({ username: "", password: "" });
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
        <Link to="/createaccount">Create an account</Link>
      </div>
    </div>
  );
}

export default Login;
