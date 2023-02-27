import React from "react";
import { useRef } from "react";
import "./Login.css";
import { loginCall } from "../../ApiCall";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* we will use useRef hook : it can work the same work as useState :stocKing data 
  but we use this hook to store hook that don't render component : it is used to 
  increase perforamce : the componemt will not render when
  variable in useRef changes 
  
  */

function Login() {
  const navigateToHome = useNavigate();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Hatri Med</h3>
          <span className="loginDesc"> Hellow :Connect With your friends</span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              minLength="6"
              maxLength="15"
              className="loginInput"
              ref={password}
              required
            />
            {error && (
              <div className="error" style={{ color: "red" }}>
                Wrong password
              </div>
            )}

            <button className="loginButton" type="submit" onClick={handleClick}>
              {isFetching ? "loading" : "Login"}
              {user ? navigateToHome("/") : ""}
            </button>

            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register ">
              <button className="loginRegisterButton">Register</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
