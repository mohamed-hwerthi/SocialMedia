const express = require("express");
const router = express.Router();
const POST = require("./Models/postModel");
const USER = require("./Models/UserModel");

//router : create a post  : validé  :
router.post("/", async (req, res) => {
  try {
    const newpost = await new POST(req.body); //créer un nouveau document
    const savedpost = await newpost.save();
    res.status(200).json(savedpost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//router : get a post  : validé  :
router.get("/:id", async (req, res) => {
  try {
    const idPost = req.params.id;
    const post = await POST.findById(idPost);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//router  : delete a  post  : validé ::
router.delete("/:id", async (req, res) => {
  const idPost = req.params.id;
  const postToDelete = await POST.findById(idPost);
  if (postToDelete.userId === req.body.userId || req.body.isAdmin) {
    try {
      await postToDelete.deleteOne();
      res.status(200).json("post deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can only delete your posts!!");
  }
});
//router : update a post  :
router.put("/:id", async (req, res) => {
  try {
    const idPostToUpdate = req.params.id;
    const postToUpdate = await POST.findById(idPostToUpdate);
    if (postToUpdate.userId === req.body.userId || req.body.isAdmin) {
      const updatedPost = await postToUpdate.updateOne({ $set: req.body });

      res.status(200).json("you have updated this  post");
    } else {
      res.status(403).json("you can only update your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//router : like and dislike o post  :
// remarque  : liker a post  ==ajouter l'id de user au tableau des likes du post
//remarque  : dislike  : fassa5 me tableau
router.put("/like/:id", async (req, res) => {
  console.log("router like and dislike a post ");
  try {
    const idPostToLike = req.params.id;
    const postToLike = await POST.findById(idPostToLike);
    if (!postToLike.likes.includes(req.body.userId)) {
      await postToLike.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked ");
    } else {
      await postToLike.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been disliked ");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//router : get user all posts  : a vérifier  :
router.get("/profile/:username", async (req, res) => {
  console.log("router get all posts of a user ");
  try {
    const user = await USER.findOne({ username: req.params.username });
    const userposts = await POST.find({ userId: user._id });

    res.status(200).json(userposts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//router : posttimeLine   :
/* in this request we will display postst thatwill appear in a user profile  : including his posts and posts of theirs friends */
router.get("/timeline/all/:userId", async (req, res) => {
  console.log("router timeline");
  try {
    const currentUser = await USER.findById(req.params.userId);

    const currentUserPosts = await POST.find({ userId: req.params.userId });
    console.log("post de med ");
    console.log(currentUserPosts);
    const currentUserFollowings = currentUser.following;
    const OtherUsersPosts = await Promise.all(
      currentUserFollowings.map(
        async (friendId) => await POST.find({ userId: friendId })
      )
    );
    const allposts = currentUserPosts.concat(...OtherUsersPosts);

    res.status(200).json(allposts);
  } catch (error) {
    res.status(500).json("il ya erreur ");
  }
});

module.exports = router;
