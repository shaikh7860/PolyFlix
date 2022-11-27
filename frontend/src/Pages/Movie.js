import React, { useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import { useState } from "react";
// import { Modal } from "bootstrap";
import Modal from "../Modal";

const axios = require("axios");

function Movie(props) {
  const navigate = useNavigate();
  // let { movieName } = useParams();
  const location = useLocation();
  const [cookies, setCookie] = useCookies("password");
  if (!cookies.password) {
    navigate("/");
  }

  async function getMovieTrailer(movieID) {
    console.log("inside func: " + movieID);

    const result = await axios.request(
      "https://api.themoviedb.org/3/movie/" +
        movieID +
        "/videos?api_key=" +
        "a4f5ca3d995fae36deb0e8691ab2d880" +
        "&language=en-US" +
        "&append_to_response=videos"
    );
    var result_filter = result.data.results.filter(
      (element) => element.type == "Trailer"
    );
    location.state.movieTrailer = String(result_filter[0].key);
  }

  function getMonth(monthNum) {
    let month = "";
    if (monthNum === "01") {
      month = "January";
    } else if (monthNum === "02") {
      month = "February";
    } else if (monthNum === "03") {
      month = "March";
    } else if (monthNum === "04") {
      month = "April";
    } else if (monthNum === "05") {
      month = "May";
    } else if (monthNum === "06") {
      month = "June";
    } else if (monthNum === "07") {
      month = "July";
    } else if (monthNum === "08") {
      month = "August";
    } else if (monthNum === "09") {
      month = "September";
    } else if (monthNum === "10") {
      month = "October";
    } else if (monthNum === "11") {
      month = "November";
    } else if (monthNum === "12") {
      month = "December";
    } else {
      month = "Undefined";
    }
    return month;
  }

  function formatDate(date) {
    const tokensArr = date.split("-");
    let month = getMonth(tokensArr[1]);
    let newDate = month + " " + tokensArr[2] + ", " + tokensArr[0];
    return newDate;
  }

  const [favButtonText, setFavButtonText] = useState("Add To Favorites");
  const [favButtonDisabled, changeDisabled] = useState(false);
  const [favButtonVariant, setFavButtonVariant] = useState("danger");

  useEffect(() => {
    props.getFavMovies(cookies.id).then((result) => {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          if (location.state.id === result[i].id) {
            console.log("match found");
            setFavButtonText("Favorited");
          }
        }
      }
    });
  }, []);

  function handleFavorites(movie) {
    props.addToFavorites(movie);
    if (favButtonText === "Add To Favorites") {
      setFavButtonText("Favorited");
    } else {
      setFavButtonText("Add To Favorites");
    }
  }
  getMovieTrailer(location.state.id);

  // code to implement modal for trailer video
  const [openModal, setOpenModal] = useState(false);

  return (
    // <div>THIS IS THE MOVIE PAGE FOR {movieName}</div>
    <div>
      <nav>
        <NavBar handleSubmit={props.handleSubmit}></NavBar>
      </nav>

      <div class="float-container1">
        <div class="title-format">
          {" "}
          {location.state.title} <br />
          <div class="add-to-favorites-button">
            <Button
              variant={favButtonVariant}
              onClick={() => handleFavorites(location.state)}
            >
              {favButtonText}
            </Button>
          </div>
        </div>

        <div class="float-child1">
          <img
            src={"http://image.tmdb.org/t/p/w342/" + location.state.poster_path}
            class="movie-image"
          />
          <br />
        </div>

        <div class="float-child2">
          <div class="description-header"> Description: </div>
          <div class="description-body">
            {" "}
            {location.state.overview} <br />{" "}
          </div>{" "}
          <br />
          <div class="movie-description">
            {" "}
            <strong> Release Date: </strong>{" "}
            {formatDate(location.state.release_date)}{" "}
          </div>{" "}
          <br />
          <div class="movie-description">
            {" "}
            <strong> Rating: </strong> {location.state.vote_average}{" "}
          </div>{" "}
          <br />
          <div class="movie-description">
            {" "}
            <strong> Duration: </strong> {location.state.runtime}{" "}
          </div>
          {/* <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/QBmre1vaLwI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        </div>
      </div>

      <div class="player-wrapper">
        {/* <div class="trailer-label"> 
            <strong> Trailer: </strong> 
          </div> */}
        <div class="trailer-watch-button">
          <button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {" "}
            Watch Trailer{" "}
          </button>
        </div>
        {openModal && (
          <Modal
            setOpenModal={setOpenModal}
            url={
              "https://www.youtube.com/watch?v=" + location.state.movieTrailer
            }
          />
        )}
        {/* <ReactPlayer class="react-player" url={"https://www.youtube.com/watch?v="+location.state.movieTrailer} controls={true} /> */}
      </div>
      <br />

      <div class="user-box">
        <div class="user-reviews-header"> User Reviews: </div>

        <div class=".user-reviews-text-box">
          <label for="freeform"></label>
          <br />
          <textarea
            id="freeform"
            name="freeform"
            placeholder="Enter Review Here..."
            rows="4"
            cols="50"
          ></textarea>{" "}
          <br /> <br />
        </div>
        <div class="post-button">
          {" "}
          <input
            value="Post"
            class="submit"
            type="button"
            onClick="dosomething(this.value);"
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default Movie;
