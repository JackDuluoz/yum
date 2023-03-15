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
  console.log(req.body)
  const submittedEmail = req.body.email
  const submittedPassword = req.body.password
  console.log(submittedEmail)
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
