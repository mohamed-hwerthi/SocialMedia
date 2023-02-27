const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 12,
      unique: true, //pour garantir l'unicité  :
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true, // pour garantir l'unicité
    },
    password: {
      type: String,
      require: true,
      min: 7,
    },
    profilePicture: {
      type: String,
      default: "", //par default c'est la chaine vide  .
    },
    coverPicture: {
      type: String,
      default: "", //par defaut c'est la chaine vide
    },
    followers: {
      type: Array,
      default: [], // par defaut c'est un tableau vide
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean, //est ce que c'est le user est un administrateur ou non
    },
    desc: {
      type: String,
      max: 250,
    },
    city: {
      type: String,
    },
    from: {
      type: String,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
