import Post from "../post/Post";
import React, { useEffect, useState } from "react";
import Share from "../Share/Share";
import "./Feed.css";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useContext } from "react";
const Feed = ({ username }) => {
  //getting user from context  :
  const { user, ...others } = useContext(AuthContext);

  // getting timeLineposts : for home page  :getting with userId ( for current user)
  //getting user all posts : for profile page  : getting with username ( for current user or onother user )
  //logic  : for profile page :we pass props  "username " from profile Comp to feed Comp and we call api :get user all posts
  //logic  : if we dont have username   : we will get user timeline post for  home page
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:6060/post/profile/${username}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log("eerror");
          console.log(err);
        });
    } else {
      axios
        .get("http://localhost:6060/post/timeline/all/" + user._id)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username, user._id]);
  return (
    <div className="Feed">
      <div className="FeedWrapper">
        <Share />
        {posts.map((p) => {
          return <Post key={p.id} postProps={p} />;
        })}
      </div>
    </div>
  );
};
export default Feed;
