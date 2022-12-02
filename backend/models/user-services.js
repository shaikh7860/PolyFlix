const { response } = require("express");
const mongoose = require("mongoose");
const UserSchema = require("./user");
let crypto = require("crypto");
require("dotenv").config();
// console.log(process.env)
let dbConnection;

let generateSalt = (rounds) => {
  return crypto
    .randomBytes(Math.ceil(rounds / 2))
    .toString("hex")
    .slice(0, rounds);
};

let hasher = (password, salt) => {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt: salt,
    hashedpassword: value,
  };
};

function setConnection(newConn) {
  dbConnection = newConn;
  return dbConnection;
}

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

async function getUsers(username, password) {
  // const userModel = getDbConnection().model("User", UserSchema);
  let result;
  if (username && password) {
    result = await findUser(username, password);
  } else {
    throw "ENTER USERNAME AND PASSWORD";
  }
  return result;
}

async function findUser(username, password) {
  const userModel = getDbConnection().model("User", UserSchema);
  let user = await userModel.findOne({ username: username });
  if (!user || !password) {
    return null;
  }
  let compare = (userpassword, hashedpassword, salt) => {
    let passwordData = hasher(userpassword, salt);
    if (passwordData.hashedpassword === hashedpassword) {
      return true;
    }
    return false;
  };
  if (compare(password, user.password, user.salt)) {
    return user;
  } else {
    return null;
  }
}
async function findUserById(id) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    const response = await userModel.findById(id);
    return response;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getAllUsers() {
  const userModel = getDbConnection().model("User", UserSchema);
  result = await userModel.find().select(["-password", "-salt"]);
  return result;
}

async function checkUserName(username) {
  const userModel = getDbConnection().model("User", UserSchema);
  let res = await userModel.findOne({ username: username });
  if (res) {
    return 0;
  } else return 1;
}

async function addUser(user) {
  // userModel is a Model, a subclass of mongoose.Model
  if (!user.password || user.password.length < 2) {
    return 1;
  }

  if (!user.username || user.username.length < 2) {
    return 1;
  }

  namematch = await checkUserName(user.username);
  if (namematch === 0) {
    return 2;
  }
  hashedObject = hasher(user.password, generateSalt(12));
  user.password = hashedObject.hashedpassword;
  user.salt = hashedObject.salt;
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    // You can use a Model to create new documents using 'new' and
    // passing the JSON content of the Document:
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function pushFavMovie(userId, movie) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    var result = await userModel.find({
      "favmovies.id": movie.id,
      _id: userId,
    });
    if (result.length == 0) {
      var isFavorited = addFavorite(userId, movie);
      // console.log(isFavorited);
    } else {
      var isFavorited = removeFavorite(userId, movie);
    }
    return isFavorited;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addFavorite(userId, movie) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    // return await userModel.updateOne(
    //   { _id: userId },
    //   { $push: { favmovies: movie } }
    // );
    x = await userModel.updateOne(
      { _id: userId },
      { $push: { favmovies: movie } }
    );
    return true;
  } catch {
    return null;
  }
}

async function removeFavorite(userId, movie) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    x = await userModel.updateOne(
      { _id: userId },
      { $pullAll: { favmovies: [movie] } }
    );
    return true;
  } catch {
    return null;
  }
}

// async function pushFriend(userId, friend) {
//   const userModel = getDbConnection().model("User", UserSchema);
//   try {
//     return await userModel.updateOne(
//       { _id: userId },
//       { $push: { friends: friend } }
//     );
//   } catch {
//     return null;
//   }
// }

async function pushFriend_2(userId, friend) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    var result = await userModel.find({
      "friends._id": friend._id,
      _id: userId,
    });
    console.log("FRIENDS RETURNED: " + JSON.stringify(result));
    if (result.length == 0) {
      var isFriended = addFriend(userId, friend);
    } else {
      console.log("HII");
      var isFriended = removeFriend(userId, friend);
    }
    return isFriended;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addFriend(userId, friend) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    // return await userModel.updateOne(
    //   { _id: userId },
    //   { $push: { favmovies: movie } }
    // );
    x = await userModel.updateOne(
      { _id: userId },
      { $push: { friends: friend } }
    );
    return true;
  } catch {
    return null;
  }
}

async function removeFriend(userId, friend) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    x = await userModel.updateOne(
      { _id: userId },
      { $pullAll: { friends: [friend] } }
    );
    return true;
  } catch {
    return null;
  }
}

// async function findUserByName(name) {
//   const userModel = getDbConnection().model("User", UserSchema);
//   return await userModel.find({ name: name });
// }

// async function findUserByJob(job) {
//   const userModel = getDbConnection().model("User", UserSchema);
//   return await userModel.find({ job: job });
// }

// async function removeUserById(id) {
//   const userModel = getDbConnection().model("User", UserSchema);
//   try {
//     const result = await userModel.findByIdAndDelete(id);
//     return result;
//   } catch (error) {
//     console.log(error);
//     return -1;
//   }
// }

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
// exports.removeUserById = removeUserById;
exports.setConnection = setConnection;
exports.findUser = findUser;
exports.pushFavMovie = pushFavMovie;
// exports.pushFriend = pushFriend;
exports.getAllUsers = getAllUsers;
exports.pushFriend_2 = pushFriend_2;
exports.checkUserName = checkUserName;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
exports.addFriend = addFriend;
exports.removeFriend = removeFriend;
