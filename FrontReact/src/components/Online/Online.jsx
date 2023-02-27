import React from "react";
import "./Online.css";

const Online = ({ onlineUser }) => {
  return (
    <div>
      <li className="rightbarFriend" key={onlineUser.id}>
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={onlineUser.profilePicture}
            alt=""
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{onlineUser.username}</span>
      </li>
    </div>
  );
};

export default Online;
