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
  expect(() => userServices.getUsers().toThrow("ENTER USERNAME AND PASSWORD"));
});

test("Test getUsers -- 1 user exists", async () => {
  const users = await userServices.getUsers("tlasso", "tlasso1");
  expect(users).toBeDefined();
  // expect(users.length).toBe(1);
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

test("Test getUsers() -- user does not exist", async () => {
  const users = await userServices.getUsers("ashaikh", "ashaikh1");
  expect(users).toBe(null);
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

// test("Test findUserById() -- Fetching by invalid id format", async () => {
//   const anyId = "123";
//   const user = await userServices.findUserById(anyId);
//   expect(user).toBeUndefined();
// });

// test("Test findUserById() -- Fetching by valid id and not finding", async () => {
//   const anyId = "6132b9d47cefd0cc1916b6a9";
//   const user = await userServices.findUserById(anyId);
//   expect(user).toBeNull();
// });

// test("Test findUserById() -- Fetching by valid id and finding", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     username: "Young wizard",
//     password: "harry1",
//   };
//   const result = new userModel(dummyUser);
//   const addedUser = await result.save();
//   const foundUser = await userServices.findUserById(addedUser.id);
//   expect(foundUser).toBeDefined();
//   expect(foundUser.id).toBe(addedUser.id);
//   expect(foundUser.name).toBe(addedUser.name);
//   expect(foundUser.job).toBe(addedUser.job);
// });

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
    username: "Y",
    password: "harry1",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Test addUser()-- failure path with invalid password length", async () => {
  const dummyUser = {
    name: "Harry Potter",
    username: "Young wizard",
    password: "h",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Test addUser()-- failure path with no username", async () => {
  const dummyUser = {
    name: "Harry Potter",
    password: "hpotter1",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Test addUser() -- failure path with no password", async () => {
  const dummyUser = {
    name: "Young wizard",
    username: "ywizard",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

test("Test addUser() -- failure path with no name", async () => {
  const dummyUser = {
    username: "Harry Potter",
    password: "hpotter1",
  };
  const result = await userServices.addUser(dummyUser);
  expect(result).toBeFalsy();
});

// test("Test removeUserById() -- successful", async () => {
//   const dummyUser = {
//     _id: "6132b9d47cefd0cc1916b6a9",
//     name: "Harry Potter",
//     username: "Young wizard",
//     password: "harry1",
//   };

//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeTruthy();
//   expect(result.name).toBe(dummyUser.name);
//   expect(result.username).toBe(dummyUser.username);
//   expect(result.password).toBe(dummyUser.password);
//   expect(result).toHaveProperty("_id");

//   const result1 = await userServices.removeUserById("6132b9d47cefd0cc1916b6a9");
//   expect(result1).toBeTruthy(); // add not -1
// });

// test("Test removeUserById() -- successful", async () => {
//   const dummyUser = {
//     _id: "6132b9d47cefd0cc1916b6a9",
//     name: "Harry Potter",
//     username: "Young wizard",
//     password: "harry1",
//   };

//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeTruthy();
//   expect(result.name).toBe(dummyUser.name);
//   expect(result.username).toBe(dummyUser.username);
//   expect(result.password).toBe(dummyUser.password);
//   expect(result).toHaveProperty("_id");

//   const result1 = await userServices.removeUserById("1324cefd0cc1916b6a9");
//   expect(result1).toBe(-1);
// });
