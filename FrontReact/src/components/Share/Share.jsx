import React from "react";
import "./share.css";
import person3 from "../../assets2/person3.png";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoodIcon from "@mui/icons-material/Mood";
import LabelIcon from "@mui/icons-material/Label";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useRef } from "react";
const Share = () => {
  //states :
  const desc = useRef();

  console.log("post desc ");
  console.log(desc);

  //getting current user  :
  const { user } = useContext(AuthContext);
  console.log("share context  ");

  return (
    <div className="Share">
      <div className="ShareWrapper">
        <div className="ShareTop">
          <img
            src={person3}
            alt="ProfilePicture"
            className="ShareProfilePicture"
          />

          <input
            type="text"
            className="ShareInput"
            placeholder={"Quoi de neuf " + user.username + "? "}
            ref={desc}
          />
        </div>
        <div className="ShareHr">
          <div className="ShareOptions">
            <div className="ShareOption">
              <PermMediaIcon
                className="ShareIcon"
                htmlColor="tomato"
              ></PermMediaIcon>
              <span className="ShareOptionText">Photo or Video</span>
              {/* <input
                id="file"
                type="file"
                name="fileToLoad"
                accept="image/png , image/jpeg" 
              ></input> */}
            </div>
            <div className="ShareOption">
              <LocationOnIcon className="ShareIcon" htmlColor="blue" />
              <span className="ShareOptionText">Location</span>
            </div>
            <div className="ShareOption">
              <MoodIcon className="ShareIcon" htmlColor="green" />
              <span className="ShareOptionText">Mood</span>
            </div>
            <div className="ShareOption">
              <LabelIcon className="ShareIcon" htmlColor="goldenrod" />
              <span className="ShareOptionText">Tag</span>
            </div>
          </div>

          <button
            className="ShareButton"
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
export default Share;
