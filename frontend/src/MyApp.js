// import Table from './Table';
// import Form from './Form';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Movie from "./Pages/Movie";
import ErrorPage from "./Pages/ErrorPage";
import SearchResult from "./Pages/SearchResult";
// import SearchBar from "./SearchBar";
// import NavBar from "./NavBar";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import { useCookies } from "react-cookie";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [Popmovies, setPopmovies] = useState([]);
  const [Topmovies, setTopmovies] = useState([]);
  const [Upcomingmovies, setUpcomingmovies] = useState([]);

  let [searchResults, setResults] = useState([...movies]);
  const [searchInput, setSearchInput] = useState("");
  const [token, setToken] = useState(null);
  const [cookies, setCookie] = useCookies("name", "username", "password", "id");
  const navigate = useNavigate();

  async function fetchPopular() {
    try {
      const response = await axios.get("http://localhost:5001/movies/popular");
      return response.data;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function fetchTop() {
    try {
      const response = await axios.get("http://localhost:5001/movies/top");
      return response.data;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function fetchUpcoming() {
    try {
      const response = await axios.get("http://localhost:5001/movies/upcoming");
      return response.data;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchPopular().then((result) => {
      if (result) setPopmovies(result);
    });
    fetchTop().then((result) => {
      if (result) setTopmovies(result);
    });
    fetchUpcoming().then((result) => {
      if (result) setUpcomingmovies(result);
    });
  }, []);

  // async function makePostCall(person) {
  //   try {
  //     const response = await axios.post("http://localhost:5001/users", person);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  function removeOneCharacter(index) {
    makeDeleteCall(characters[index]["_id"]).then((result) => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
    });
  }
  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete(`http://localhost:5001/users/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // function updateList(person) {
  //   makePostCall(person).then((result) => {
  //     if (result && result.status === 201)
  //       setCharacters([...characters, result.data]);
  //     navigate("/users-table");
  //   });
  // }

  function searchForMovies(movie) {
    setSearchInput(movie);
    fetchSome(movie).then((result) => {
      if (result) setResults(result);
    });
    navigate("/searchResult");
  }

  async function fetchSome(name) {
    try {
      const response = await axios.get(
        "http://localhost:5001/search?name=" + name
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function tryLogIn(token) {
    try {
      const response = await axios.get(
        "http://localhost:5001/users?username=" +
          token["username"] +
          "&password=" +
          token["password"]
      );
      if (response) {
        console.log(response.data);
        updateToken(response.data.users_list);
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeAccount(token) {
    try {
      const response = await axios.post("http://localhost:5001/user", token);
      updateToken(response.data);
    } catch (error) {
      console.log(error);
      navigate("/createaccount");
      return;
    }
  }

  async function addToFavorites(movie) {
    const response = await axios.put(
      "http://localhost:5001/user/" + cookies.id,
      movie
    );
    if (response) {
      const userRes = await axios.get(
        "http://localhost:5001/users/" + cookies.id
      );
      updateToken(userRes.data.users_list, false);
      return userRes;
    }
  }

  async function getFavMovies(id) {
    const userRes = await axios.get("http://localhost:5001/users/" + id);
    if (userRes) {
      return userRes.data.users_list["favmovies"];
    } else {
      return [];
    }
  }

  function updateToken(token, goHome = true) {
    setToken(token);
    setCookie("name", token["name"], { path: "/", maxAge: "900" });
    setCookie("username", token["username"], { path: "/", maxAge: "900" });
    setCookie("password", token["password"], { path: "/", maxAge: "900" });
    setCookie("id", token["_id"], { path: "/", maxAge: "900" });
    if (goHome) {
      navigate("/home");
    }
  }

  function logOut() {
    setCookie("password", null);
    navigate("/");
  }

  return (
    <div className="container-fluid">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Login handleSubmit={tryLogIn} />
              <ul>
                <Link to="/createaccount">Create an account</Link>
              </ul>
            </div>
          }
        />
        <Route
          path="/createaccount"
          element={
            <div>
              <CreateAccount handleSubmit={makeAccount} />
              <ul>
                <Link to="/">Go back</Link>
              </ul>
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <Home
              PopMovieData={Popmovies}
              TopMovieData={Topmovies}
              UpcomingMovieData={Upcomingmovies}
              characterData={characters}
              removeCharacter={removeOneCharacter}
              handleSubmit={searchForMovies}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              logOut={logOut}
              handleSubmit={searchForMovies}
              PopMovieData={cookies.favmovies}
              getFavMovies={getFavMovies}
            />
          }
        />
        <Route
          path="/movie/:movieName"
          element={
            <Movie
              handleSubmit={searchForMovies}
              addToFavorites={addToFavorites}
              getFavMovies={getFavMovies}
            />
          }
        />
        <Route
          path="/searchResult"
          element={
            <SearchResult
              movieData={searchResults}
              characterData={characters}
              movieName={searchInput}
              handleSubmit={searchForMovies}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default MyApp;
