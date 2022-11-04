const mongoose = require('mongoose');
const UserSchema = require("./user");
require('dotenv').config()
// console.log(process.env)
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
  
async function getUsers(username, password){
    const userModel = getDbConnection().model("User", UserSchema);
    let result;
    if (username && password){
        result = await findUser(username, password);
    }
    else {
        throw 'ENTER USERNAME AND PASSWORD'
    }
    console.log(result.length);  
    if (result.length === 0){
        return null;
    }
    return result;  
}

async function findUser(username, password){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'username': username, 'password': password});
}
async function findUserById(id){
    const userModel = getDbConnection().model("User", UserSchema);    
    try{
        return await userModel.findById(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

async function addUser(user){
    // userModel is a Model, a subclass of mongoose.Model
    const userModel = getDbConnection().model("User", UserSchema);
    try{
        // You can use a Model to create new documents using 'new' and 
        // passing the JSON content of the Document:
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    }catch(error) {
        console.log(error);
        return false;
    }   
}

async function findUserByUserName(username){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'username':username});
}

async function findUserByJob(job){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'job':job});
}

async function removeUserById(id){
    const userModel = getDbConnection().model("User", UserSchema);
    try{
        const result = await userModel.findByIdAndDelete(id);
        return result;
    }catch(error) {
        console.log(error);
        return -1;
    }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.removeUserById = removeUserById;
exports.findUserByUserName = findUserByUserName;