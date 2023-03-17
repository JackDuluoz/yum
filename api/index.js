require('dotenv').config();

const express = require("express");
const { connectToDb, getDb } = require("./db/db");
const { ObjectId } = require("mongodb");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require('morgan');
const bodyparser = require("body-parser");

// Initialize App
const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
let db
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
    console.log("Listening on port 3000...");
    });
    db = getDb()
  }
})

// Routes

// Users
app.get("/users", (req, res) => {
  let users = []
  db.collection('users')
    .find()
    .sort({ lastName: 1 })
    .forEach(user => users.push(user))
    .then(() => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch users'})
    })
});

app.get("/users/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('users')
    .findOne({_id: new ObjectId(req.params.id)})
    .then((doc) => {
      res.status(200).json(doc)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch user document'})
    })
  } else {
    res.status(500).json({error: 'Not a valid document id'})
  }
});

app.post('/users/login', (req, res) => {

  const submittedEmail = req.body.email
  const submittedPassword = req.body.password


  if (!submittedEmail) {
    return res.status(400).send({ message: "Email cannot be blank" })
  }
  if (!submittedPassword) {
    return res.status(400).send({ message: "Password cannot be blank" })
  }

  db.collection('users')
    .findOne({email: submittedEmail.toLowerCase().trim()})
    .then((user) => {
      console.log(user)
      if (!user) {
        return res.status(400).send({ message: "User does not exist" })
      }
      if (user.password !== submittedPassword) {
        return res.status(400).send({ message: "Invalid password" })
      }
        return res.status(200).send({ message: "Welcome back", user })     
    })
  
})

const usernameExists = async (submission)=> {
  const user = await db.collection('users')
    .findOne({username: submission.trim()})
      if (user) {
        console.log("Username already exists")
        return true
      } else {
        console.log("Username available")
        return false
      }
}

const emailExists = async (submission)=> {
  const user = await db.collection('users')
    .findOne({email: submission.toLowerCase().trim()})
      if (user) {
        console.log("Email in use")
        return true
      } else {
        console.log("Email not in use")
        return false
      }
}

app.post('/users/register', async (req, res) => {

  const submittedUsername = req.body.username
  const submittedEmail = req.body.email
  const submittedPassword = req.body.password

  if (!submittedUsername) {
    return res.status(400).send({ message: "Username cannot be blank" })
  }
  if (!submittedEmail) {
    return res.status(400).send({ message: "Email cannot be blank" })
  }
  if (!submittedPassword) {
    return res.status(400).send({ message: "Password cannot be blank" })
  }
  if (await usernameExists(submittedUsername)) {
    return res.status(400).send({ message: "Username already exists" })
  }
  if (await emailExists(submittedEmail)) {
    return res.status(400).send({ message: "Email in use" })
  }
  
  db.collection('users')
    .insertOne({ username: submittedUsername, email: submittedEmail, password: submittedPassword, isAdmin: false })
    .then((response) => {
      console.log(response)
      db.collection('users')
        .findOne({_id: response.insertedId})
        .then((user) => {
          console.log('User created', user)
          res.status(201).send({ message: "New user added", user })
        })
        .catch((error) => {
          res.status(500).send({ message: "Find error", error })
        })
    })
    .catch((error) => {
      res.status(500).send({ message: "Insert error", error })
    })
  
})
