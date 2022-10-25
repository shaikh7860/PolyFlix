const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');
const crypto = require("crypto");
const axios = require("axios");
require('dotenv').config()


const movieServices = require('./models/movie-services');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/movies', async (req, res) => {
    // const name = req.query['name'];
    // const description = req.query['description'];
    // try {
    //     const result = await movieServices.getMovies(name, description);
    //     res.send({movies: result});         
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send('An error ocurred in the server.');
    // }
    // key = process.env.KEY
    // const options = {
    // method: 'GET',
    // url: 'https://moviesminidatabase.p.rapidapi.com/movie/order/byRating/',
    // params: {page_size: '50', page: '1'},
    // headers: {
    //     'X-RapidAPI-Key': process.env.KEY,
    //     'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    // }
    // };
    try{
        const result = await axios.request('https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.API_KEY + '&language=en-US&page=1')
        // res.send({movies: result.data.results});
        res.send(result.data.results);
    } catch(error){
            console.log(error);
            res.status(500).send('An error ocurred in the server.');
    }
    // const path = await axios.request("https://api.themoviedb.org/3/configuration?api_key=" + process.env.API_KEY)
    // baseURL = path.data.images.base_url + "w500" + result.data.result
    // console.log(baseURL)
});

app.get('/movies/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await movieServices.findMovieById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({movies: result});
    }
});

app.post('/movies', async (req, res) => {
    const movie = req.body;
    const savedmovie = await movieServices.addMovie(movie);
    if (savedmovie)
        res.status(201).send(savedmovie);
    else
        res.status(500).end();
});

app.delete('/movies/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await movieServices.removeMovieById(id);
    if (result == -1){
       res.status(404).send('Resource not found.');
    }
    else{
       res.status(204).end();
    }
 
 });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      
