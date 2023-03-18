const User = require('../models/userModel')
const mongoose = require('mongoose')

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})
  res.status(200).json(users)
}

const getUser = async (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Invalid id'})
  }
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)
}

const login = async (req, res) => {
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
}

const register = async (req, res) => {
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
    return res.status(200).send({ message: "Welcome", user })  
  } catch (error) {
    res.status(500).send({ message: "Error", error })
  }
}

module.exports = { getUsers, getUser, login, register }