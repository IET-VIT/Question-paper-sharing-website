const express = require('express');
const router = express.Router();
const multer = require('multer');
const { login, signup, logout } = require('../controllers/authControllers');

router.post('/auth/login', multer().none(), async (req, res) => login)

router.post('/auth/signup', multer().none(),async (req, res) => signup)

router.get('/logout', (req, res) => logout )

module.exports.router = router;
