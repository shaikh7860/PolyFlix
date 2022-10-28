
import React from "react";
import Table from '../Table.js'

function SearchResult(props) {
  if (props.movieData.length > 0){

    return <div>Search results for: {props.movieName}

    <Table movieData = {props.movieData} characterData={props.characterData} removeCharacter={props.removeCharacter} />
    </div>;
  }else{
    return <div>No results found for: {props.movieName}</div>
  }

}

export default SearchResult;