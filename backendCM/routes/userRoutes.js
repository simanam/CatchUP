const express = require('express');

const router = express.Router();

const UserCtrl = require('../controllers/users');
const AuthHelper = require('../helpers/AuthHelper');

router.get('/users', AuthHelper.VerifyToken, UserCtrl.getAllUsers);
router.get('/user/:id', AuthHelper.VerifyToken, UserCtrl.getUser);
router.get('/users/:username', AuthHelper.VerifyToken, UserCtrl.getByUsername);

module.exports = router;
