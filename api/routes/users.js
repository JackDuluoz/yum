const express = require('express');
const router = express.Router()

const { getUsers, getUser, addYumToUser, login, register } = require('../controllers/userController')

router.get("/", getUsers);

router.get("/:id", getUser);

router.put("/:id", addYumToUser);

router.post("/login", login)

router.post("/register", register)

module.exports = router;