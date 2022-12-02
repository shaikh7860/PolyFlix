import React, { useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");

  function handleChange(event) {
    setSearchInput(event.target.value);
  }

  function submitSearch() {
    props.handleSubmit(searchInput);
    setSearchInput("");
  }

  return (
    <box>
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          onChange={handleChange}
          value={searchInput}
        />
        <div class="search-button">
          <Button variant="danger" onClick={submitSearch}>
            Search
          </Button>
        </div>
      </div>
    </box>
  );
}

export default SearchBar;
