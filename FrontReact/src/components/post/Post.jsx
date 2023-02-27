import "./post.css";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import like from "../../assets2/like.png";
import adore from "../../assets2/adore.jpg";
import axios from "axios";
import avatar from "../../assets2/avatar";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Posts } from "../../fakeData";
const Post = ({ postProps }) => {
  //states
  let [likeCount, setLikeCount] = useState(postProps.likes.length);
  let [isLike, setIsLike] = useState(false);
  let [isAdored, setIsAdored] = useState(false);
  const [user, setUser] = useState({});

  //api : getting User  Corresponding to each post : get user with id  :
  useEffect(
    () =>
      async function getUser() {
        try {
          const res = await axios.get(
            `http://localhost:6060/user/${postProps.userId}`
          );
          setUser(res.data);
        } catch (error) {
          console.log(error);
        }
      },
    []
  );

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <Link to={`profile/${user.username}`}>
            <img
              src={user.profilePicture || avatar}
              alt=""
              className="postProfilePicture"
            />
          </Link>
          <div className="postTopText">
            <div className="postProfileName">{user.username}</div>
            <div style={{ color: "blue" }} className="postDuration">
              {format(postProps.createdAt)}
            </div>
          </div>
          <MoreHorizIcon className="postTopLeft" />
        </div>
        <div className="postBody">
          <div className="postTitle">{postProps?.desc}</div>
          {/* a revoir avec backend  */}
          {Posts[0]["photo"] ? (
            <img src={Posts[0]["photo"]} alt="" className="postImage" />
          ) : (
            ""
          )}
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={() => {
                if (!isLike) {
                  setLikeCount((likeCount += 1));
                  setIsLike(!isLike);
                } else {
                  setLikeCount((likeCount -= 1));
                  setIsLike(!isLike);
                }
              }}
              className="likeIcon"
              src={like}
              alt=""
            />
            <img
              onClick={() => {
                if (!isAdored) {
                  setLikeCount((likeCount += 1));
                  setIsAdored(!isAdored);
                } else {
                  setLikeCount((likeCount -= 1));
                  setIsAdored(!isAdored);
                }
              }}
              className="likeIcon"
              src={adore}
              alt=""
            />
            <span className="postLikeCounter" style={{ color: "blue" }}>
              {likeCount} <p style={{ color: "blue" }}>People Liked it </p>
            </span>
          </div>
          <div style={{ color: "blue" }} className="buttonRight">
            {postProps?.comment} 5 Comments
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
