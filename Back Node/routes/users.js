const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./Models/UserModel");
const mongoose = require("mongoose");
//api : delete user =delete compte  :chaque user peut supprimer seulement son compte  :
router.delete("/:id", async (req, res) => {
  console.log("delete a user ");
  if (req.params.id === req.body.userId) {
    try {
      const user = await User.findByIdAndDelete(req.body.params);
      res.status(200).json("profile has been deleted ");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can only delete your profile ");
  }
});
//----------------------------------------------------------------------
//update userPassword : validé  : :
router.put("/updatePassword/:id", async (req, res) => {
  console.log("router update password ");
  if (req.params.id === req.body.userId || req.body.isAdmin) {
    try {
      //getting password to update  :
      const userToUpdatePassword = await User.findById(req.params.id);
      const oldHashedPassword = userToUpdatePassword.password;
      //hashing new password  :
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        console.log({ newHashedPassword });
        //comparer old hashedpassword and  the gived password   :
        const variable = await bcrypt.compare(
          req.body.password,
          oldHashedPassword
        );
        if (variable) {
          console.log("mot de passe correct ");
          //updating password
          userToUpdatePassword
            .updateOne({ $set: { password: newHashedPassword } })
            .then((res) => {
              console.log({ res });
              console.log("tabba3");
            })
            .catch((err) => console.log({ err }));

          res.status(200).json("password updated");
        } else {
          res.send("wrong password ");
        }
      } else {
        res.status(403).json("you must enter your password ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("you must be the admin of this acount to update password ");
  }
});
//router  : update les autres champs de profile  : username  ,profilepicture , ...
router.put("/:id", async (req, res) => {
  console.log("router update a user sauf mot de passe ");
  try {
    if (req.params.id === req.body.userId || req.body.isAdmin) {
      await User.findByIdAndUpdate(req.params.id, { $set: req.body });
      const UpdatedUser = await User.findById(req.params.id);

      res.status(200).json("profile updated succefully");
    } else {
      res.status(403).json("you can only update your profile ");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//---------------------------------------------------------------------------

//router : get a user with id  :
router.get("/:id", async (req, res) => {
  console.log("router get user with id ");
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const { password, updatedAt, ...others } = user._doc; //il ne faut pas rendre les donées personelles so destructuring the object
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//router fetching user with username  : for the profile page :
router.get("/", async (req, res) => {
  console.log("router get user with username ");

  try {
    const userToFetchWithUsername = await User.findOne({
      username: req.query.username,
    });

    res.status(200).json(userToFetchWithUsername);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router  : follow a user
router.put("/follow/:id", async (req, res) => {
  console.log("follow a user ");
  if (req.params.id !== req.body.userId) {
    try {
      const currentUser = await User.findById(req.body.userId);

      const userTofollow = await User.findById(req.params.id);

      if (!userTofollow.followers.includes(currentUser.id)) {
        await userTofollow.updateOne({
          $push: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $push: { following: req.params.id },
        });

        res.status(200).json("succeed following ");
      } else {
        res.status(403).send("you already follow this user ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can not follow yourself");
  }
});

//router  : unfollow a user   : validéé

router.put("/unfollow/:id", async (req, res) => {
  console.log("unfollow a user ");
  if (req.params.id !== req.body.userId) {
    try {
      const unfollowedUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (unfollowedUser.followers.includes(req.body.userId)) {
        await currentUser.updateOne({
          $pull: { following: req.params.id },
        });
        await unfollowedUser.updateOne({
          $pull: { followers: req.body.userId },
        });

        res.status(200).json("user unfollowed ");
      } else {
        res.status(403).json("you do not unfollow this user ");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can not unfollow yourself");
  }
});

//router : getallfriends  : retourner un tableau qui contient  : id  , username  , profilePicture
// pourquoi promise.all : car tableau des promise   ! !!
router.get("/friends/:userId", async (req, res) => {
  console.log("router get friends of a user ");
  console.log("req.params .userId");
  console.log(req.params.userId);
  const userId = req.params.userId;
  try {
    const userToGetFriends = await User.findById(userId);
    const friends = await Promise.all(
      userToGetFriends.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    const listfriends = [];
    friends.map((e) => {
      const { _id, username, profilePicture } = e;
      listfriends.push({ _id, username, profilePicture });
    });
    res.status(200).json(listfriends);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
