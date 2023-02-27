import React, { Children, useState } from "react";
import "./RightBar.css";
import eedmiled from "../../assets2/3idmiled.jpg";
import { Users } from "../../fakeData";
import Online from "../Online/Online";
import { useEffect } from "react";
import avatar from "../../assets2/avatar";
import axios from "axios";
export default function RightBar({ Profile, user, username }) {
  const HomeRightBar = () => {
    return (
      <>
        <div className="rightBarTop">
          <img src={eedmiled} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        {Users.map((user) => {
          return <Online key={user.id} onlineUser={user} />;
        })}
      </>
    );
  };
  const ProfileRightBar = () => {
    const { _id, ...other } = user;

    //getting user all friends from api :
    const [userFriends, setUserFriends] = useState([]);
    useEffect(() => {
      axios
        .get(`http://localhost:6060/user/friends/${_id}`)
        .then((res) => {
          setUserFriends(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
      <>
        <div className="UserInformation">
          <h1 className="userInformationTitle">user Information</h1>
          <div className="userInformationItem">
            <span className="infoItemKey">City : </span>
            <span className="infoItemValue">{user?.city}</span>
          </div>
          <div className="userInformationItem">
            <span className="infoItemKey">From : </span>
            <span className="infoItemValue">{user?.from}</span>
          </div>
          <div className="userInformationItem">
            <span className="infoItemKey">RelationShip : </span>
            <span className="infoItemValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : ""}{" "}
            </span>
          </div>
        </div>
        <h1 className="userInformationTitle" style={{ marginLeft: "20px" }}>
          user Friends
        </h1>
        <div className="userFriends">
          {userFriends.map((e) => {
            return (
              <div key={e.username} className="userFriend">
                <img
                  src={e.profilePicture ? e.profilePicture : avatar}
                  alt=""
                  className="userProfilePicture"
                />
                <div className="userFriendName">{e.username}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightBarWrapper">
        {Profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
