const express = require('express');
const router = express.Router()

const { getUsers, getUser, addYumToUser, removeYumFromUser, login, register } = require('../controllers/userController')

router.get("/", getUsers);

router.get("/:id", getUser);

router.put("/:id/add", addYumToUser);

router.put("/:id/remove", removeYumFromUser);

router.post("/login", login)

router.post("/register", register)

module.exports = router;