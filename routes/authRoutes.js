const express = require('express');
const router = express.Router();
const multer = require('multer');
const { login, signup, logout } = require('../controllers/authControllers');

router.post('/auth/login', multer().none(), async (req, res) => login(req, res))

router.post('/auth/signup', multer().none(),async (req, res) => signup(req, res))

router.get('/logout', (req, res) => logout(req, res))

module.exports.router = router;
