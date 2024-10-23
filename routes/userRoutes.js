const express = require('express');
// const { registerUser, loginUser } = require('../controllers/userController');
const {registerUser,loginUser} = require('../contorllers/userController')
const router = express.Router();

// @route    POST /api/users/register
router.post('/register', registerUser);

// @route    POST /api/users/login
router.post('/login', loginUser);

module.exports = router;
