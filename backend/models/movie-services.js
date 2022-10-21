const mongoose = require('mongoose');
const MovieSchema = require("./movie");
require('dotenv').config()
let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
  }
  
async function getMovies(name, description){
    const MovieModel = getDbConnection().model("Movie", MovieSchema);
    let result;
    if (name === undefined && description === undefined){
        result = await MovieModel.find();
    }
    else if (name && !description) {
        result = await findMovieByName(name);
    }
    else if (description && !name){
        result = await findMovieBydescription(description);
    }   
    return result;  
}

async function findMovieById(id){
    const MovieModel = getDbConnection().model("Movie", MovieSchema);    
    try{
        return await MovieModel.findById(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

async function addMovie(Movie){
    // MovieModel is a Model, a subclass of mongoose.Model
    const movieModel = getDbConnection().model("Movie", MovieSchema);
    try{
        // You can use a Model to create new documents using 'new' and 
        // passing the JSON content of the Document:
        const MovieToAdd = new movieModel(Movie);
        const savedMovie = await MovieToAdd.save()
        return savedMovie;
    }catch(error) {
        console.log(error);
        return false;
    }   
}

async function findMovieByName(name){
    const MovieModel = getDbConnection().model("Movie", MovieSchema);
    return await MovieModel.find({'name':name});
}

async function findMovieBydescription(description){
    const MovieModel = getDbConnection().model("Movie", MovieSchema);
    return await MovieModel.find({'description':description});
}

async function removeMovieById(id){
    const MovieModel = getDbConnection().model("Movie", MovieSchema);
    try{
        const result = await MovieModel.findByIdAndDelete(id);
        return result;
    }catch(error) {
        console.log(error);
        return -1;
    }
}

exports.getMovies = getMovies;
exports.findMovieById = findMovieById;
exports.addMovie = addMovie;
exports.removeMovieById = removeMovieById;