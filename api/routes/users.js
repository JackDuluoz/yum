const express = require('express');
const router = express.Router()

const User = require('../models/userModel'); 

const { getUsers, getUser } = require('../controllers/userController')

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/login", async (req, res) => {

  const submittedEmail = req.body.email
  const submittedPassword = req.body.password

 try {
   const user = await User.findOne({ email: submittedEmail.toLowerCase().trim() })
    if (user.password !== submittedPassword) {
        return res.status(400).send({ message: "Invalid password" })
      } else {
        return res.status(200).send({ message: "Welcome back", user })     
    }
  } catch (error) {
    return res.status(400).send({ message: "User does not exist" })
  }
  
})

router.post("/register", async (req, res) => {

  const submittedUsername = req.body.username
  const submittedEmail = req.body.email
  const submittedPassword = req.body.password

  try {
    const user = await User.create({
      username: submittedUsername,
      email: submittedEmail.toLowerCase().trim(),
      password: submittedPassword,
      isAdmin: false
    })
    return res.status(200).send({ message: "Welcome back", user })  
  } catch (error) {
    res.status(500).send({ message: "Error", error })
  }

})

module.exports = router;