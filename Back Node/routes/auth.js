//authentification

const express = require("express");
const router = express.Router();
const User = require("./Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// --------------------------------------------------------------------------
//api  : register   : validé
router.post("/register", async (req, res) => {
  console.log("router register");
  try {
    const salt = await bcrypt.genSalt(10); //crypter le mot de passe dans la base de donnéé
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      //create new user  :
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save(); //save the user  :
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ----------------------------------------------------------------------------------

//login request  : validé

router.post("/login", async (req, res) => {
  console.log(" router login ");
  try {
    const user = await User.findOne({ email: req.body.email }); //cas ou le user n'existe pas

    !user && res.status(404).json("user not found ");
    //cas ou le mot de passe est faux  :
    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(validatedPassword);
    /* !validatedPassword && res.status(400).json("wrong password ");
    res.status(200).json(user); //si tous va bien  : */
    if (validatedPassword) {
      res.status(200).json(user);
    } else {
      res.status(404).json("wrong password ");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//mot de passe oublié  :
//request : forgeuetted password  :
// router.post("/forguettedPassword", async (req, res) => {
//     console.log("router forgotPassword");
//     const userEmail = req.body.email;
//     console.log(userEmail);

//     try {
//         const forgettedUser = await User.findOne({ email: userEmail });
//         if (!forgettedUser) {
//             res.send('email not found ')
//         }

//         //generr secret avec jwt  :
//         const secret =

//     } catch (error) {
//         console.log(error);
//         res.status(200).json({});
//     }
// });

module.exports = router;
