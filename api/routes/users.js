const express = require('express');
const router = express.Router()

const { getUsers, getUser } = require('../controllers/userController')

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/login", (req, res) => {
  res.json({message: "login post"})
})

router.post("/register", (req, res) => {
  res.json({message: "register post"})
})

// app.post('/users/login', (req, res) => {
//   console.log(req.body)
//   const submittedEmail = req.body.email
//   const submittedPassword = req.body.password
//   console.log(submittedEmail)
//   if (!submittedEmail) {
//     return res.status(400).send({ message: "Email cannot be blank" })
//   }
//   if (!submittedPassword) {
//     return res.status(400).send({ message: "Password cannot be blank" })
//   }
//   db.collection('users')
//     .findOne({email: submittedEmail.toLowerCase().trim()})
//     .then((user) => {
//       console.log(user)
//       if (!user) {
//         return res.status(400).send({ message: "User does not exist" })
//       }
//       if (user.password !== submittedPassword) {
//         return res.status(400).send({ message: "Invalid password" })
//       }
//         return res.status(200).send({ message: "Welcome back", user })     
//     })
// })

// app.post('/users/register', (req, res) => {
//   const submittedUsername = req.body.username
//   const submittedEmail = req.body.email
//   const submittedPassword = req.body.password
//   if (!submittedUsername) {
//     return res.status(400).send({ message: "Username cannot be blank" })
//   }
//   if (!submittedEmail) {
//     return res.status(400).send({ message: "Email cannot be blank" })
//   }
//   if (!submittedPassword) {
//     return res.status(400).send({ message: "Password cannot be blank" })
//   }
//   db.collection('users')
//     .insertOne({ username: submittedUsername, email: submittedEmail, password: submittedPassword, isAdmin: false })
//     .then((response) => {
//       console.log(response)
//       db.collection('users')
//         .findOne({_id: response.insertedId})
//         .then((user) => {
//           console.log(user)
//           res.status(201).send({ message: "New user added", user })
//         })
//         .catch((error) => {
//           res.status(500).send({ message: "Find error", error })
//         })
//     })
//     .catch((error) => {
//       res.status(500).send({ message: "Insert error", error })
//     })     
// })

module.exports = router;