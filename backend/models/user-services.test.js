const mongoose = require("mongoose");
const UserSchema = require("./user");
const userServices = require("./user-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let userModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  userModel = conn.model("User", UserSchema);

  userServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyUser = {
    name: "Chuck Norris",
    username: "cnorris",
    password: "cnorris1",
  };
  result = await userServices.addUser(dummyUser);
  await result.save();

  dummyUser = {
    name: "Ted Lasso",
    username: "tlasso",
    password: "tlasso1",
  };
  result = await userServices.addUser(dummyUser);
  await result.save();

  dummyUser = {
    name: "Mike Lasso",
    username: "mlasso",
    password: "mlasso1",
  };
  result = await userServices.addUser(dummyUser);
  await result.save();

  dummyUser = {
    name: "Pepe Guardiola",
    username: "pguardiola",
    password: "pguardiola1",
  };
  result = await userServices.addUser(dummyUser);
  await result.save();
});

afterEach(async () => {
  await userModel.deleteMany();
});

test("Testing getUsers -- input undefined", async () => {
  try {
    await userServices.getUsers();
  } catch (e) {
    expect(e).toEqual("ENTER USERNAME AND PASSWORD");
  }
});

test("Test getUsers -- 1 user exists", async () => {
  const users = await userServices.getUsers("tlasso", "tlasso1");
  expect(users).toBeDefined();
});

test("Test getUsers -- 3 user exists", async () => {
  const user1 = await userServices.getUsers("tlasso", "tlasso1");
  const user2 = await userServices.getUsers("pguardiola", "pguardiola1");
  const user3 = await userServices.getUsers("mlasso", "mlasso1");

  let users = [];

  users.push(user1);
  users.push(user2);
  users.push(user3);
  expect(users).toBeDefined();
  expect(users.length).toBe(3);
});

test("Test findUser() -- no input", async () => {
  const users = await userServices.findUser();
  expect(users).toBe(null);
});

test("Test findUser() -- password only", async () => {
  const users = await userServices.findUser(null, "tlasso1");
  expect(users).toBe(null);
});

test("Test findUser() -- username only", async () => {
  const users = await userServices.findUser("tlasso", null);
  expect(users).toBe(null);
});

test("Test findUser() -- username and password", async () => {
  const users = await userServices.findUser("tlasso", "tlasso1");
  expect(users).toBeDefined();
});

test("Test findUser() -- correct username and incorrect password", async () => {
  const users = await userServices.findUser("pguardiola", "hello");
  expect(users).toBeFalsy();
});

test("Test findUserById() -- Fetching by invalid id format", async () => {
  const anyId = "123";
  const user = await userServices.findUserById(anyId);
  expect(user).toBeUndefined();
});

test("Test findUserById() -- Fetching by valid id and not finding", async () => {
  const anyId = "6132b9d47cefd0cc1916b6a9";
  const user = await userServices.findUserById(anyId);
  expect(user).toBeNull();
});

test("Test addUser() -- successful path", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeTruthy();
  expect(result.name).toBe(dummyUser.name);
  expect(result.username).toBe(dummyUser.username);
  expect(result.password).toBe(dummyUser.password);
  expect(result).toHaveProperty("_id");
});

test("Test addUser() -- failure path with invalid id", async () => {
  const dummyUser = {
    _id: "123",
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Test addUser() -- failure path with already taken id", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };
  const addedUser = await userServices.addUser(dummyUser);

  const anotherDummyUser = {
    _id: addedUser.id,
    name: "Ron Potter",
    username: "Ron wizard",
    password: "ron1",
  };
  const result = await userServices.addUser(anotherDummyUser);
  expect(result).toBeFalsy();
});

test("Test addUser()-- failure path with invalid username length", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "H",
    password: "harry1",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBe(1);
});

test("Test addUser()-- failure path with invalid password length", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "h",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBe(1);
});

test("Test addUser()-- failure path with no username", async () => {
  const dummyUser = {
    name: "Harry Potter",
    password: "hpotter1",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBe(1);
});

test("Test addUser() -- failure path with no password", async () => {
  const dummyUser = {
    name: "Young wizard",
    username: "ywizard",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBe(1);
});

test("Test addUser() -- failure path with no name", async () => {
  const dummyUser = {
    username: "Harry Potter",
    password: "hpotter1",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Test addUser() -- checkUserName returns 0", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };
  const result = await userServices.addUser(dummyUser);
  const result2 = await userServices.addUser(dummyUser);

  expect(result2).toBe(2);
});

test("Test getAllUsers() -- get the size of users array ", async () => {
  const result = await userServices.getAllUsers();
  expect(result.length).toBe(4);
});

test("Test checkUserName(username) -- valid username", async () => {
  const result = await userServices.checkUserName("cnorris");
  expect(result).toBe(0);
});

test("Test pushFavMovie(userID, movie) -- ", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };
  const movie = { id: "1000", name: "Batman" };
  const result = await userServices.addUser(dummyUser);
  const result2 = userServices.pushFavMovie(result._id, movie);
  expect(result2).toBeTruthy();
});

test("Test addFavorite(userID, movie) -- successful add", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };
  const movie = { id: "1000", name: "Batman" };
  const result2 = await userServices.addUser(dummyUser);
  const result = await userServices.addFavorite(result2._id, movie);
  expect(result).toBeTruthy();
});

test("Test removeFavorite(userID, movie) -- successful remove", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };
  const movie1 = { id: "1000", name: "Batman" };
  const movie2 = { id: "1001", name: "Superman" };
  const result = await userServices.addUser(dummyUser);
  const result1 = await userServices.addFavorite(result._id, movie1);
  const result2 = await userServices.addFavorite(result._id, movie2);
  const result3 = await userServices.removeFavorite(result._id, movie1);
  expect(result3).toBeTruthy();
});

test("Test pushFriend_2(userID, friend) -- ", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };

  const dummyUser1 = {
    name: "Michael Jordan",
    username: "mike",
    password: "mike1",
  };

  // const friend = {friends_id: "1000", name: "Batman"};
  const result = await userServices.addUser(dummyUser);
  const result1 = await userServices.addUser(dummyUser1);
  const result2 = userServices.pushFriend_2(result._id, result1._id);
  expect(result2).toBeTruthy();
});

test("Test addFriend(userID, friend) and removeFriend(userID, friend) -- successful add and remove", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "harry1",
  };

  const dummyUser1 = {
    name: "Michael Jordan",
    username: "mike",
    password: "mike1",
  };

  // const friend = {friends_id: "1000", name: "Batman"};
  const result = await userServices.addUser(dummyUser);
  const result1 = await userServices.addUser(dummyUser1);
  const result2 = userServices.addFriend(result._id, result1);
  const result3 = userServices.removeFriend(result._id, result1);
  expect(result2).toBeTruthy();
  expect(result3).toBeTruthy();
});
