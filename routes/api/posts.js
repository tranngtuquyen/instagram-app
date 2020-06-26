const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/',
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);
    
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    const newPost = new Post({
      text: req.body.text,
      image: req.body.image,
      user: req.user.id,
      name: req.user.name,
      avatar:req.user.avatar
    });
      newPost.save().then(post =>
      res.json(post));
    
  });
 
// @route   GET api/posts
// @desc    Get  all posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts
// @desc    get all posts of a user
// @access  Private
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.find({ user: req.user.id })
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
    })   
  })  
// @route   POST api/posts/like/:post_id
// @desc    Like post
// @access  Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.post_id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

// @route   POST /api/posts/:post_id/tag/:user_id
// @desc    tag a user to post
// @access  Private
router.post(
  "/:post_id/tag/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      if (post.tag.filter(tag => tag.user.toString() === req.params.user_id).length > 0) {
        return res.status(400).json({ msg: 'this person is already tagged' });
      }
      post.tag.unshift({ user: req.params.user_id });
      post.save().then(post => res.json(post));
      Profile.findOne({ user: req.params.user_id }).then(othersProfile => {
        othersProfile.tagged.unshift({ postId: req.params.post_id });
        othersProfile.save().then(() => {
          //  res.json({ msg: 'success' });
          console.log(othersProfile);
        });
      });
    }).catch((err) =>
      res.status(500).json({ msg: "Server Error" }));
  });
// @route   POST /api/posts/:post_id/untag/:user_id
// @desc    untag user
// @access  Private
router.post('/:post_id/untag/:user_id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.post_id).then(post => {
    if (post.tag.filter(tag => tag.user.toString() === req.params.user_id).length === 0) {

      return res.status(400).json({ msg: 'You have not tagged this person' });
    }

    const removeIndex1 = post.tag.map(tag => tag.user.toString()).indexOf(req.params.user_id);
    post.tag.splice(removeIndex1, 1);
    post.save().then(p => res.json(p));
    Profile.findOne({ user: req.params.user_id }).then(othersProfile => {
      const removeIndex2 = othersProfile.tagged.map(tagged => tagged.postId.toString()).indexOf(req.params.post_id);
      othersProfile.tagged.splice(removeIndex2, 1);
      othersProfile.save();
    })
  }).catch((err) => {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" })
  });
});

// @route   GET /api/posts/user/tagged
// @desc    Get tagged posts of current user
// @access  Private
router.get("/user/tagged",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);
    Profile.findOne({user: req.user.id})
      .populate({
        path: "tagged",
        populate: {
          path: "postId",
          select: "image"
        }
      })
      .then(profile => {
        if (profile) {
          return res.json(profile.tagged)
        } else {
          return res.status(400).json({noprofilefound: "No profile found in then"});
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;

