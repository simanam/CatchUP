const HttpStatus = require("http-status-codes");
const User = require("../models/userModels");

module.exports = {
  followlUser(req, res) {
    const followlUser = async () => {
      await User.update(
        {
          _id: req.user._id,
          "following.userFollowed": { $ne: req.body.userFollowed }
        },
        {
          $push: {
            following: {
              userFollowed: req.body.userFollowed
            }
          }
        }
      );
      await User.update(
        {
          _id: req.body.userFollowed,
          "following.follower": { $ne: req.user._id }
        },
        {
          $push: {
            followers: {
              follower: req.user._id
            },
            notifications: {
              senderId: req.user._id,
              message: `${req.user.username} is now following you`,
              created: new Date(),
              viewProfile: false
            }

          }
        }
      );
    };
    followlUser()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: "Following user now" });
      })
      .catch(err => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error Occured" });
      });
  },


 unfollowlUser(req, res) {
    const unfollowlUser = async () => {
      await User.update(
        {
          _id: req.user._id,
          
        },
        {
          $pull: {
            following: {
              userFollowed: req.body.userFollowed
            }
          }
        }
      );
      await User.update(
        {
          _id: req.body.userFollowed
          
        },
        {
          $pull: {
            followers: {
              follower: req.user._id
            }
          }
        }
      );
    };
    unfollowlUser()
      .then(() => {
        res.status(HttpStatus.OK).json({ message: "Unfollowing user now" });
      })
      .catch(err => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error Occured" });
      });
  },
 async markNoti(req, res){
    if(!req.body.deleteValue){
      await User.updateOne({
        _id: req.user._id,
        'notifications._id': req.params.id
      },{
        $set: {'notifications.$.read': true}
      }).then(() => {
        res.status(HttpStatus.OK).json({message:'Marked as read'});
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error Occured'});
      })
    }else {
      await User.update({
        _id: req.user._id,
        'notifications._id': req.params.id
      },{
        $pull:{
          notifications:{_id: req.params.id}
        }
      }).then(() => {
        res.status(HttpStatus.OK).json({message:'Deleted Succefully'});
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error Occured'});
      })
    }
  },
  async markAllNoti(req, res){
    await User.update({
      _id: req.user._id

    },{
      $set: {'notifications.$[elem].read': true}
    }, {arrayFilters: [{'elem.read': false}], multi: true })
    .then(() => {
      res.status(HttpStatus.OK).json({message:'Marked all Succefully'});
    })
    .catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error Occured'});
    })
  }
   
};
