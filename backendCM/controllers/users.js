const httpStatus = require('http-status-codes');
const User = require('../models/userModels');


module.exports = {
  async  getAllUsers(req, res){
      await User.find({})
      .populate('posts.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then((result) => {
          res.status(httpStatus.OK).json({message: 'All users', result});
      }).catch(err => {
          res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({message: 'Error Occured'})
      })
  },


  async  getUser(req, res){
    await User.findOne({_id: req.params.id})
    .populate('posts.postId')
    .populate('following.userFollowed')
    .populate('followers.follower')
    .then((result) => {
        res.status(httpStatus.OK).json({message: 'user by id', result});
    }).catch(err => {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({message: 'Error Occured'})
    })
},
async  getByUsername(req, res){
    await User.findOne({username: req.params.username})
    .populate('posts.postId')
    .populate('following.userFollowed')
    .populate('followers.follower')
    .then((result) => {
        res.status(httpStatus.OK).json({message: 'user by username', result});
    }).catch(err => {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({message: 'Error Occured'})
    })
}
};
