const express = require('express');

const router = express.Router();

const MessageCtrl = require('../controllers/message');
const AuthHelper = require('../helpers/AuthHelper');

// router.get('/chat-message/:sender_Id/:receiver_Id', AuthHelper.VerifyToken, MessageCtrl.getAllMessage);

router.post('/chat-message/:sender_Id/:receiver_Id', AuthHelper.VerifyToken, MessageCtrl.sendMessage);


module.exports = router;