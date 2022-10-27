import React from "react";
import Table from '../Table.js'

function SearchResult(props) {
  return <div>THIS IS THE SearchResult PAGE

    <Table movieData = {props.movieData} characterData={props.characterData} removeCharacter={props.removeCharacter} />
  </div>;

}

export default SearchResult;