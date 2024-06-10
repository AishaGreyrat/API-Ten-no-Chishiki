const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para usuarios
router.post('/register', userController.registrarUsuario);
router.post('/login', userController.logearUsuario);

module.exports = router;