import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import OtherUserProfile from "./Pages/OtherUserProfile";
import Movie from "./Pages/Movie";
import ErrorPage from "./Pages/ErrorPage";
import SearchResult from "./Pages/SearchResult";
import UserSearch from "./Pages/UserSearch";
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
  var baseUrl = "http://localhost:5001/";

  if (process.env.NODE_ENV == "production") {
    baseUrl = "https://polyflix.azurewebsites.net/";
  }

  async function fetchPopular() {
    try {
      const response = await axios.get(baseUrl + "movies/popular"); // http://localhost:5001/movies/popular
      return response.data;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function fetchTop() {
    try {
      const response = await axios.get(baseUrl + "movies/top"); // http://localhost:5001/movies/top
      return response.data;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }
  async function fetchUpcoming() {
    try {
      const response = await axios.get(baseUrl + "movies/upcoming"); // http://localhost:5001/movies/upcoming
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
      const response = await axios.delete(baseUrl + `users/${id}`); // http://localhost:5001/users/${id}
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

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
        baseUrl + "search?name=" + name // http://localhost:5001/search?name=
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
        baseUrl +
          "users?username=" + // http://localhost:5001/users?username=
          token["username"] +
          "&password=" +
          token["password"]
      );
      if (response.data.users_list) {
        updateToken(response.data.users_list);
        return true;
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
      const response = await axios.post(baseUrl + "user", token);
      updateToken(response.data);
      return 0;
    } catch (error) {
      console.log(error);
      navigate("/createaccount");
      return error.response.status;
    }
  }

  async function addToFavorites(movie) {
    const response = await axios.put(
      baseUrl + "usermovie/" + cookies.id,
      movie
    );
    if (response) {
      const userRes = await axios.get(baseUrl + "users/" + cookies.id);
      updateToken(userRes.data.users_list, false);
      return userRes;
    }
  }

  async function addFriend(user) {
    const response = await axios.put(
      baseUrl + "userfriend/" + cookies.id,
      user
    );
    if (response) {
      const userRes = await axios.get(baseUrl + "users/" + cookies.id);
      updateToken(userRes.data.users_list, false);
      return userRes;
    }
  }

  async function getFavMovies(id) {
    const userRes = await axios.get(baseUrl + "users/" + id);
    if (userRes) {
      return userRes.data.users_list["favmovies"];
    } else {
      return [];
    }
  }

  async function getFriends(id) {
    const userRes = await axios.get(baseUrl + "users/" + id);
    if (userRes) {
      return userRes.data.users_list["friends"];
    } else {
      return [];
    }
  }

  async function getAllUsers() {
    const result = await axios.get(baseUrl + "allusers");
    if (result) {
      return result.data.users_list;
    } else {
      return [];
    }
  }

  async function getMovieTrailer(movieID) {
    const result = await axios.get(baseUrl + "movies/trailer/" + movieID);
    if (result) {
      return result.data;
    } else {
      return false;
    }
  }

  async function getMovieDetails(movieID) {
    const result = await axios.get(baseUrl + "movies/details/" + movieID);
    if (result) {
      return result.data;
    } else {
      return false;
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
            </div>
          }
        />
        <Route
          path="/createaccount"
          element={
            <div>
              <CreateAccount handleSubmit={makeAccount} />
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
              getMovieDetails={getMovieDetails}
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
              getMovieDetails={getMovieDetails}
            />
          }
        />
        <Route
          path="/user/:userName"
          element={
            <OtherUserProfile
              handleSubmit={searchForMovies}
              getFavMovies={getFavMovies}
              addFriend={addFriend}
              getFriends={getFriends}
              getMovieDetails={getMovieDetails}
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
              getMovieTrailer={getMovieTrailer}
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
              getMovieDetails={getMovieDetails}
            />
          }
        />
        <Route
          path="/userSearch"
          element={
            <UserSearch
              handleSubmit={searchForMovies}
              getAllUsers={getAllUsers}
            />
          }
        />
        <Route
          path="/friendslist/:userName"
          element={
            <UserSearch
              handleSubmit={searchForMovies}
              getAllUsers={getFriends}
            />
          }
        />
        <Route
          path="*"
          element={<ErrorPage handleSubmit={searchForMovies} />}
        />
      </Routes>
    </div>
  );
}

export default MyApp;
