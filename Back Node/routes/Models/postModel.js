const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            required: false,
            type: String,

        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);   
