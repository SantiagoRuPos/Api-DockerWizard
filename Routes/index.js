
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

router.post('/login',authController.login);
router.post('/reset',authController.UpdatePasswordByUsuer);
router.post('/register-user',authController.RegisterUser);

module.exports = router;