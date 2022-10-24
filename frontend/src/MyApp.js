import Table from './Table';
import Form from './Form';
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';


function MyApp() {
  const [movies, setmovies] = useState([]);
  let [searchResults, setResults] = useState([...movies]);
  const navigate = useNavigate();

  
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5001/movies');
       return response.data.movies;     
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
          setmovies(result);
    });
  }, [] );

  async function makePostCall(movie){
    try {
       const response = await axios.post('http://localhost:5001/movies', movie);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
 }
 
function removeOneMovie(index) {

   makeDeleteCall(movies[index]['_id']).then( result => {
      if (result && result.status === 204){
            const updated = movies.filter((movie, i) => {
            return i !== index
         });
         setmovies(updated);      
         }
      });
    
 }
 async function makeDeleteCall(id){
   try {
      const response = await axios.delete(`http://localhost:5001/movies/${id}`);
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
}
 function updateList(movie) { 
   makePostCall(movie).then( result => {
   if (result && result.status === 201)
      setmovies([...movies, result.data] );
   });
}

function searchForMovies(movie) {
   fetchSome(movie).then(result => {
     if (result)
       setResults(result);
   });
   navigate('/search');  
   return;
 }

 async function fetchSome(name){
    try {
        const response = await axios.get('http://localhost:5001/movies?name=' + name);
        return response.data.movies;
    }
    catch (error){
        console.log(error);
        return false;
    }
 }

 return (
  <div className="container">
    <SearchBar handleSubmit = {searchForMovies}/>
    <Routes>
      <Route
         path = '/'
         element = {
            <div>
               <Table movieData={movies} removeMovie={removeOneMovie} />
               <Form handleSubmit = {updateList} />
            </div>
         }
      />
      <Route
         path = '/'
         element = {
            <div>
               <Table movieData={searchResults} removeMovie={removeOneMovie} />
            </div>
         }
      />
    </Routes>
  </div>
);
}

export default MyApp;