const Joi = require("joi");
const HttpStatus = require("http-status-codes");
const Post = require("../models/postModels");
const User = require("../models/userModels");
module.exports = {
  addPost(req, res) {
    const schema = Joi.object().keys({
      post: Joi.string().required()
    });
    const { error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }
    const body = {
      user: req.user._id,
      username: req.user.username,
      post: req.body.post,
      created: new Date()
    };
    Post.create(body)
      .then(async post => {
        await User.update(
          {
            _id: req.user._id
          },
          {
            $push: {
              posts: {
                postId: post._id,
                post: req.body.post,
                created: new Date()
              }
            }
          }
        );

        res.status(HttpStatus.OK).json({ message: "Post created", post });
      })
      .catch(err => {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  },
  async getAllPost(req, res) {
    try {
      const posts = await Post.find({totalLikes: {$gte: 2}})
        .populate("user")
        .sort({ created: -1 });

        const top = await Post.find({})
        .populate("user")
        .sort({ created: -1 });


      return res.status(HttpStatus.OK).json({ message: "All posts", posts, top });
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error Occured" });
    }
  },
  async addComment(req, res) {
    const postid = req.body.postId;
    await Post.update(
      {
        _id: postid
      },
      {
        $push: {
          comments: {
            userId: req.user._id,
            username: req.user.username,
            comment: req.body.comment,
            createdAt: new Date()
          }
        }
      }
    )
      .then(() => {
        res.status(HttpStatus.OK).json({ message: "Comment Added" });
      })
      .catch(err =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error Occured" })
      );
  },

  async addLike(req, res) {
    const postid = req.body._id;
    await Post.update(
      {
        _id: postid,
        "likes.username": { $ne: req.user.username }
      },
      {
        $push: {
          likes: {
            username: req.user.username
          }
        },
        $inc: { totalLikes: 1 }
      }
    )
      .then(() => {
        res.status(HttpStatus.OK).json({ message: "You Likes the post" });
      })
      .catch(err =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error Occured" })
      );
  },
  async getPost(req, res) {
    await Post.findOne({ _id: req.params.id })
    .populate("user")
    .populate("comments.userId")
    .then(post => {
        res.status(HttpStatus.OK).json({ message: "Post found", post });
      })
      .catch(err =>
        res.status(HttpStatus.NOT_FOUND).json({ message: "Not found" })
      );
  }
};
