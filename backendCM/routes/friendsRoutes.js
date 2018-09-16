const express = require('express');

const router = express.Router();

const FriendCtrl = require('../controllers/friends');
const AuthHelper = require('../helpers/AuthHelper');

router.post('/follow-user', AuthHelper.VerifyToken, FriendCtrl.followlUser);
router.post('/unfollow-user', AuthHelper.VerifyToken, FriendCtrl.unfollowlUser);
router.post('/mark/:id', AuthHelper.VerifyToken, FriendCtrl.markNoti);
router.post('/mark-all', AuthHelper.VerifyToken, FriendCtrl.markAllNoti);

module.exports = router;