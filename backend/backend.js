const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const crypto = require("crypto");

const userServices = require('./models/user-services');

// const users = { 
//     users_list :
//     [
//        { 
//           id : 'xyz789',
//           name : 'Charlie',
//           job: 'Janitor',
//        },
//        {
//           id : 'abc123', 
//           name: 'Mac',
//           job: 'Bouncer',
//        },
//        {
//           id : 'ppp222', 
//           name: 'Mac',
//           job: 'Professor',
//        }, 
//        {
//           id: 'yat999', 
//           name: 'Dee',
//           job: 'Aspring actress',
//        },
//        {
//           id: 'zap555', 
//           name: 'Dennis',
//           job: 'Bartender',
//        }
//     ]
//  }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const name = req.query['name'];
    const job = req.query['job'];
    try {
        const result = await userServices.getUsers(name, job);
        res.send({users_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

// app.get('/users', (req, res) => {
//     const name = req.query.name;
//     const job = req.query.job;
//     if(name && job){
//         let result = findUserByNameAndJob(name, job);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else if (name){
//         let result = findUserByName(name);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else if (job){
//         let result = findUserByJob(job);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else {
//         res.send(users);
//     }
// });


// const findUserByName = (name) => { 
//     return users['users_list'].filter( (user) => user['name'] === name); 
// }
// const findUserByJob = (name, job) => { 
//     return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job); 
// }
// const findUserByNameAndJob = (name, job) => { 
//     return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job); 
// }

// app.get('/users/:id', (req, res) => {
//     const id = req.params['id']; //or req.params.id
//     let result = findUserById(id);
//     if (result === undefined || result.length == 0)
//         res.status(404).send('Resource not found.');
//     else {
//         result = {users_list: result};
//         res.send(result);
//     }
// });

// function findUserById(id) {
//     return users['users_list'].find( (user) => user['id'] === id); // or line below
//     //return users['users_list'].filter( (user) => user['id'] === id);
// }

// app.post('/users', (req, res) => {
//     const userToAdd = req.body;
//     newUser = addUser(userToAdd);
//     res.status(201).send(newUser).end();
// });

// function addUser(user){
//     const id = crypto.randomBytes(3).toString("hex");
//     user['id'] = id;
//     users['users_list'].push(user);
//     return user;
// }

// app.delete('/users/:id', (req, res) => {
//     const userToDelete = req.params['id'];
//     if(deleteUser(userToDelete)){
//         res.status(204).end();
//     }
//     else{
//         res.status(404).send('Resource not found.');
//     }
// });
// function deleteUser(id){
//     const newArr = users['users_list'].filter( (user) => user['id'] !== id); 
//     if (users.users_list.length === newArr.length){
//         return false;
//     }
//     users['users_list'] = newArr;
//     return true;
// }
