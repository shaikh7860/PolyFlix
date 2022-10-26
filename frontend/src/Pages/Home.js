import React from "react";
import Form from '../Form.js'
import Table from '../Table.js'


function Home(props) {
  return(
    <div>
      THIS IS THE HOME PAGE

      <Table movieData = {props.movieData} characterData={props.characterData} removeCharacter={props.removeCharacter} />
      <Form handleSubmit = {props.handleSubmit} />

    </div>
    
  );
   
}

export default Home;
