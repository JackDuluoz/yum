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



module.exports = { getUsers, getUser }

// const usernameExists = async (submission)=> {
//   const user = await db.collection('users')
//     .findOne({username: submission})
//       if (user) {
//         console.log("Username already exists")
//         return true
//       } else {
//         console.log("Username available")
//         return false
//       }
// }

// const emailExists = async (submission)=> {
//   const user = await db.collection('users')
//     .findOne({email: submission})
//       if (user) {
//         console.log("Email in use")
//         return true
//       } else {
//         console.log("Email not in use")
//         return false
//       }
// }