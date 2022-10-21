import React, {useState} from 'react';

function Form(props) {   
   const [movie, setmovie] = useState(
      {  
         name: '',
         description: '',
      }
   );
   function handleChange(event) {
    const { name, value } = event.target;
    if (name === "description")
       setmovie(
          {name: movie['name'], description: value}
       );
    else
      setmovie(
          {name: value, description: movie['description']}
       );   
  }
  function submitForm() {
    props.handleSubmit(movie);
    setmovie({name: '', description: ''});
  }
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={movie.name}
        onChange={handleChange} />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={movie.description}
        onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />
    </form>
    
); 
}


export default Form;