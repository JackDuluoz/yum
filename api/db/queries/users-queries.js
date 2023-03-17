const usernameExists = async (submission)=> {
  const user = await db.collection('users')
    .findOne({username: submission})
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
    .findOne({email: submission})
      if (user) {
        console.log("Email in use")
        return true
      } else {
        console.log("Email not in use")
        return false
      }
}

module.exports = { usernameExists, emailExists }