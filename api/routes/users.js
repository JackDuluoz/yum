const express = require('express');
const router = express.Router()

const { getUsers, getUser, login, register } = require('../controllers/userController')

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/login", login)

router.post("/register", register)

module.exports = router;