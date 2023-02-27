import React from "react";
import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handelSubmitRegister = (e) => {
    e.preventDefault();
    if (confirmedPassword !== password) {
      alert("confirmed password not matches with password ");
    } else {
      axios
        .post("http://localhost:6060/auth/register", {
          username,
          email,
          password,
          confirmedPassword,
        })
        .then((res) => {
          console.log(res.data);
          alert("well");
          navigate("/login");
        })
        .catch((err) => {
          alert("Compte Exsite deja  , Move to Login  ");
        });
    }
  };

  //giving states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Hatri Med</h3>
          <span className="loginDesc">Connect , Chat and Enjoy</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handelSubmitRegister}>
            <input
              placeholder="Username"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              placeholder="Password"
              required
              className="loginInput"
              type="password"
              minLength="6"
              maxLength="15"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              type="password"
              maxLength={15}
              minLength="6"
              onChange={(e) => {
                setConfirmedPassword(e.target.value);
              }}
            />

            <button className="loginButton" type="submit">
              {" "}
              Sign Up
            </button>
            <button className="loginRegisterButton">
              <Link>Log into Account</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
