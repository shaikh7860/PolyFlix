import Table from './Table';
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Movie from "./Pages/Movie";
import ErrorPage from "./Pages/ErrorPage";





function MyApp() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate()
  
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5001/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
          setCharacters(result);
    });
  }, [] );

  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:5001/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
 }
 
function removeOneCharacter (index) {

   makeDeleteCall(characters[index]['_id']).then( result => {
      if (result && result.status === 204){
            const updated = characters.filter((character, i) => {
            return i !== index
         });
         setCharacters(updated);      
         }
      });
    
 }
 async function makeDeleteCall(id){
   try {
      const response = await axios.delete(`http://localhost:5001/users/${id}`);
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
}
 function updateList(person) { 
   makePostCall(person).then( result => {
   if (result && result.status === 201)
      setCharacters([...characters, result.data] );
      navigate('/users-table')
   });
}
 return (
  <div className="container">
   <nav>
      <ul>
         <li><Link to='/profile'>Go to Profile</Link></li>
         <li><Link to='/'>Go Home</Link></li>
      </ul>
      </nav>
    {/* <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit = {updateList} /> */}
   

      <Routes>
         <Route path="/" element={<Home characterData={characters} removeCharacter={removeOneCharacter} handleSubmit = {updateList} />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/movie/:movieName" element={<Movie />} />
         <Route path="*" element={<ErrorPage />}/>
      </Routes>
  
   </div>


);
}

export default MyApp;