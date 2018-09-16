const express = require('express')
const router = express.Router();

const PostCtrl = require('../controllers/posts');
const AuthHelper = require('../helpers/AuthHelper')
router.get('/posts', AuthHelper.VerifyToken, PostCtrl.getAllPost);
router.get('/post/:id', AuthHelper.VerifyToken, PostCtrl.getPost);

router.post('/post/add-post',AuthHelper.VerifyToken, PostCtrl.addPost);
router.post('/post/add-like',AuthHelper.VerifyToken, PostCtrl.addLike);
router.post('/post/add-comment',AuthHelper.VerifyToken, PostCtrl.addComment)


module.exports = router;