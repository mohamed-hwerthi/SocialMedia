import React from "react";
import Sidebar from "../../components/sideBar/sidebar";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/Feed/Feed";
import "./Home.css";
import RightBar from "../../components/RightBar/RightBar";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

export const Home = () => {
  const { user, ...others } = useContext(AuthContext);

  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <RightBar username={user.username} />
      </div>
    </>
  );
};
