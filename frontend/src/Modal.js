import React from "react";
// import "./Modal.css";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

function Modal(props) {
  return (
    <div>
      <div class="trailer-exit-button">
        <button onClick={() => props.setOpenModal(false)}>
          {" "}
          Close Trailer{" "}
        </button>
      </div>
      <div class="react-player">
        <ReactPlayer url={props.url} controls={true} />
      </div>
    </div>
  );
}

export default Modal;
