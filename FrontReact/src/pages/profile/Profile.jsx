import React, { useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/RightBar/RightBar";
import Sidebar from "../../components/sideBar/sidebar";
import "./Profile.css";
import { useEffect } from "react";
import avatar from "../../assets2/avatar";
import { useParams } from "react-router";

import axios from "axios";
const Profile = () => {
  let username = useParams().username; //getting usernane from  url params  :
  /* getting  user profile : api :get user  with username  : */
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:6060/user?username=${username}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [username]);

  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user.coverPicture} alt="" />
              <img
                className="profileUserImg"
                src={user.profilePicture ? user.profilePicture : avatar}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">
                {user.desc ? user.desc : "--------------------"}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />

            <RightBar Profile user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
