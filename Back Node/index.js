const express = require("express");
const app = express();
const mongoose = require("mongoose"); // package that hekps working node -mongodb  :
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userroutes = require("./routes/users");
const authroutes = require("./routes/auth");
const postroutes = require("./routes/post");
const cors = require('cors')
//helmet  : for extra security  : package  :
//morgan  : when making request to the server  : irajja3 des inforamtions 3a requette
//to use .env we must do this  :
dotenv.config();
//connection with data base :
mongoose.connect("mongodb://localhost:27017/SocialmediaDB")
    .then(() => console.log("connected to DB"))
    .catch(err => {
        console.log(err);
        console.log("not connected to DB social ")
    })






//midddelweare :
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/user", userroutes);
app.use("/auth", authroutes);
app.use('/post', postroutes);
app.listen(6060, () => console.log("server is running in port 6060"));
