const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");
const User = require("../../models/User");
const validateComment = require("../../validation/comment");
const Tag = require("../../models/Tag");

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
      .then(profile => {
        const newPost = new Post({
          text: req.body.text,
          image: req.body.image,
          user: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar,
        });

        if (profile) {
          newPost.handle = profile.handle;
        }

        newPost.save()
        .then(post => {
          return res.json(post);
        })
        .catch(err => {
          console.error(err.message);
          res.status(500).send('Server Error')
        })
      })
      .catch(err => console.log(err))
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

// @route   GET api/posts/selected
// @desc    Get  all posts except posts of currentUser
// @access  Private
router.get("/selected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  
    Post.find()
      .populate("user", ["avatar"])
      .sort({ date: -1 })
      .then((posts) => {
        if (posts) {
          // console.log(posts);
          let selected = posts.filter(
            (post) => {
              return (post.user !== null) && (post.user._id.toString() !== req.user.id)}
          );

          return res.json(selected);
        } else {
          return res.status(404).json({ nopostsfound: "No posts found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ nopostsfound: "No posts found" });
      });
  }
);

// @route   GET api/posts/following
// @desc    Get  all posts from following list
// @access  Private
router.get("/following",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
    Profile.findOne({user: req.user.id})
      .then(profile => {
        if (profile) {
          const following = profile.following.map(person => person.user);
          console.log(following);
          //Check if following list === 0
          if (following.length === 0) {
            Post.find()
              .populate("user", ["avatar"]).populate("comments.user", ["avatar"])
              .sort({ date: -1 })
              .then((posts) => {
                if (posts) {
                  // console.log(posts);
                  let selected = posts.filter(
                    (post) => {
                      return (post.user !== null) && (post.user._id.toString() !== req.user.id)}
                  );

                  return res.json(selected);
                } else {
                  return res.status(404).json({ nopostsfound: "No posts found" });
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(404).json({ nopostsfound: "No posts found" });
              });
          } else {
            //Display posts from following list only
            Post.find({ user: { $in: following } })
              .populate("user", ["avatar"]).populate("comments.user", ["avatar"]) // populating to get latest avatar from user model and id directly from user model rather than static avatar and id. helps if commeneted user changes his dp or if he deletes account user will be == null
              .sort({ date: -1 })
              .then((posts) => {
                return res.json(posts);
              });
        }} else {
          return res.status(404).json({ noprofilefound: "No profile found"});
        }
      })
      .catch(err => res.status(404).json({ noprofilefound: "No profile found"}));
  }
);

// @route   GET api/posts/currentUser
// @desc    get all posts of current user
// @access  Private
router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find({ user: req.user.id })
      .sort({ date: -1 })
      .then((posts) => {
       
        return res.json(posts);
      })
      .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
  }
);
// @route   GET api/posts/otheruserposts/:user_id
// @desc    get all posts of other user by their user_id
// @access  Public
// router.get(
//   "/otheruserposts/:user_id",
//   // passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//      Post.find()
//       .sort({ date: -1 })
//       .then((posts) => {
//         if(posts) {
//       let otheruserposts;
//         otheruserposts = posts.filter(post => 
//         post.user.toString() === req.params.user_id)
//         return res.json(otheruserposts);
        
//        } else  {
//        return res.status(404).json({ nopostsfound: "No posts found" });
//       }})
//       .catch((err) =>{
//         console.log(err); 
//         res.status(404).json({ nopostsfound: "No posts found" })});
//   }
// );

// @route   GET api/posts/otheruserposts/:handle
// @desc    get all posts of other user by their handle
// @access  Public
router.get(
  "/otheruserposts/:handle",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
     Post.find({handle : req.params.handle})
      .sort({ date: -1 })
      .then((posts) => {
        if(posts) {
         return res.json(posts);
       } else  {
       return res.status(404).json({ nopostsfound: "No posts found" });
      }})
      .catch((err) =>{
        console.log(err); 
        res.status(404).json({ nopostsfound: "No posts found" })});
  }
);
// @route   GET api/posts/:id
// @desc    Get a post by id
// @access  Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("user", ["avatar"])
    .populate("comments.user", ["avatar"])
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        return res.status(404).json({ nopostfound: "No post found" });
      }
    })
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
          if (post) {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "User not authorized" });
            }
            // Delete
            post.remove().then(() => res.json({ success: true }));
          } else {
            return res.status(404).json({ nopostfound: "No post found"});
          }
        })
        .catch(err => console.log(err))
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
// @route   POST api/posts/unlike/:post_id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.post_id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

// @route   POST /api/posts/:post_id/tag/:profile_id
// @desc    tag a user to post
// @access  Private
router.post(
  "/:post_id/tag/:profile_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.params.profile_id)
      .then(profile => {
        if (profile) {
          Post.findById(req.params.post_id)
            .then(post => {
              if (post) {
                Tag.findOne({post: req.params.post_id, profile: req.params.profile_id})
                .then(tag => {
                  if (tag) {
                    return res.status(400).json({msg: "This person has been tagged"})
                  } else {
                    const newTag = new Tag({
                      post: req.params.post_id,
                      image: post.image,
                      profile: req.params.profile_id,
                      handle: profile.handle,
                      leftX: req.body.leftX,
                      topY: req.body.topY
                    });
    
                    newTag.save()
                      .then(tag => res.json(tag));
                  }
                })
              } else {
                return res.status(404).json({nopostfound: "No post found"});
              }
            })
            .catch(err => res.status(404).json(err));
        } else {
          return res.status(404).json({noprofilefound: "No profile found"});
        }
      })
      .catch(err => res.status(404).json(err));
  }
)

// @route   POST /api/posts/:post_id/untag/:profile_id
// @desc    untag user
// @access  Private
router.post(
  "/:post_id/untag/:profile_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tag.findOneAndDelete({post: req.params.post_id, profile: req.params.profile_id})
      .then(tag => res.json({msg: "Success"}))
      .catch(err => res.status(400).json(err));
  }
)


// @route   GET /api/posts/tagpost/:post_id
// @desc    Get tags by postId
// @access  Private
router.get(
  "/tagpost/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tag.find({post: req.params.post_id})
      .then(tags => res.json(tags))
      .catch(err => res.status(400).json(err))
  }
);

// @route   GET /api/posts/tagprofile/:handle
// @desc    Get tags by handle
// @access  Private
router.get(
  "/tagprofile/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tag.find({handle: req.params.handle})
      .then(tags => res.json(tags))
      .catch(err => res.status(400).json(err))
  }
)

// @route   POST api/posts/comment/:post_id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateComment(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then((post) => {
        if (post) {
          Profile.findOne({user: req.user.id})
          .then(profile => {
            const newComment = {
              text: req.body.text,
              name: req.user.name,
              avatar: req.user.avatar,
              user: req.user.id,
            };

            if (profile) {
              newComment.handle = profile.handle;
            }

            // Add to comments array
            post.comments.unshift(newComment);

            // Save
            post.save().then((post) => res.json(post));
          })
          .catch(err => console.log(err));
        } else {
          return res.status(404).json({postnotfound: "No post found"});
        }
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   POST api/posts/save/:post_id
// @desc    Save post
// @access  Private
router.post(
  "/save/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        Post.findById(req.params.post_id)
        .then((post) => {
          if (
            post.saved.filter((save) => save.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadysaved: "User already saved this post" });
          }

          // Add user id to likes array
          post.saved.unshift({ user: req.user.id });

          //Create new savedPost and add to profile.saved array
          const savedPost = {
            postId: post._id,
            image: post.image
          }
          profile.saved.unshift(savedPost);
          profile.save();
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
      } else {
        return res.status(404).json({noprofilefound: "No profile found"});
      }
    });
  }
);

// @route   POST api/posts/unsave/:post_id
// @desc    Unsave post
// @access  Private
router.post(
  "/unsave/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        Post.findById(req.params.post_id)
        .then((post) => {
          if (
            post.saved.filter((save) => save.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ nosaved: "You have not yet saved this post" });
          }

          // Get remove index
          const removeIndex = post.saved
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.saved.splice(removeIndex, 1);
           
          //Splice out of profile array
          const removeIndex2 = profile.saved
            .map(item => item.postId.toString())
            .indexOf(post._id);
          
          profile.saved.splice(removeIndex2,1);
          profile.save();
          // Save
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
      } else {
        return res.status(404).json({noprofilefound: "No profile found"});
      }
    });
  }
);



module.exports = router;

