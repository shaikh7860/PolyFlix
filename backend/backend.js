const express = require("express");
const app = express();
const port = 5001;
const cors = require("cors");
// const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();

const userServices = require("./models/user-services");
// const { reset } = require("nodemon");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/movies/popular", async (req, res) => {
  listOfPopMovies = [];
  try {
    const result = await axios.request(
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
        process.env.API_KEY +
        "&language=en-US&page=1&region=US"
    );

    listOfPopMovies.push(...result.data.results);
    const result2 = await axios.request(
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
        process.env.API_KEY +
        "&language=en-US&page=2&region=US"
    );
    listOfPopMovies.push(...result2.data.results);
    res.send(listOfPopMovies);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});
app.get("/movies/top", async (req, res) => {
  listOfTopMovies = [];
  try {
    const result = await axios.request(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
        process.env.API_KEY +
        "&language=en-US&page=1&region=US"
    );
    listOfTopMovies.push(...result.data.results);
    const result2 = await axios.request(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
        process.env.API_KEY +
        "&language=en-US&page=2&region=US"
    );
    listOfTopMovies.push(...result2.data.results);
    res.send(listOfTopMovies);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});
app.get("/movies/upcoming", async (req, res) => {
  try {
    const result = await axios.request(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
        process.env.API_KEY +
        "&language=en-US&page=1&region=US"
    );
    res.send(result.data.results);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});
app.get("/movies/trailer/:movieID", async (req, res) => {
  const id = req.params["movieID"];
  try {
    const result = await axios.request(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/videos?api_key=" +
        process.env.API_KEY +
        "&language=en-US" +
        "&append_to_response=videos"
    );
    var result_filter = result.data.results.filter(
      (element) => element.type == "Trailer"
    );
    if (result_filter[0]) {
      res.send(String(result_filter[0].key));
    } else {
      res.send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured in the server");
  }
});

app.get("/movies/details/:movieID", async (req, res) => {
  const id = req.params["movieID"];
  try {
    const result = await axios.request(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        process.env.API_KEY +
        "&language=en-US"
    );
    res.send(result.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured in the server");
  }
});

app.get("/search", async (req, res) => {
  try {
    const name = req.query["name"];
    const result = await axios.request(
      "https://api.themoviedb.org/3/search/movie/?api_key=" +
        process.env.API_KEY +
        "&query=" +
        name
    );
    res.send(result.data.results);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users", async (req, res) => {
  const username = req.query["username"];
  const password = req.query["password"];
  try {
    const result = await userServices.getUsers(username, password);
    if ({ users_list: result }) {
      res.send({ users_list: result });
    } else {
      res.status(500).send("No users found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});

app.get("/allusers", async (req, res) => {
  const result = await userServices.getAllUsers();
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});

app.post("/user", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser === 1) {
    res.status(400).end();
  } else if (savedUser === 2) {
    res.status(500).end();
  } else res.status(201).send(savedUser);
});

app.put("/usermovie/:id", async (req, res) => {
  const movie = req.body;
  const userId = req.params["id"];
  const updatedUser = await userServices.pushFavMovie(userId, movie);
  if (updatedUser) {
    res.status(201).send(updatedUser);
  } else {
    res.status(500).end();
  }
});

app.put("/userfriend/:id", async (req, res) => {
  const friend = req.body;
  const userId = req.params["id"];
  const updatedUser = await userServices.pushFriend_2(userId, friend);
  if (updatedUser) res.status(201).send(updatedUser);
  else res.status(500).end();
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.removeUserById(id);
  if (result == -1) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).end();
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
