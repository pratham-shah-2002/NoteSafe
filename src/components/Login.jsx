import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Image from "../images/login.png";
import Avatar from "../images/avatar.svg";
import "../styles/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [err, seterr] = useState("");
  const [style, setStyle] = useState({ opacity: 0, color: "red" });
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const login = async () => {
    const response = await fetch(
      "https://notesafe.herokuapp.com/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
    } else {
      seterr(json.error);
      setStyle({ opacity: 1, color: "red" });
      setcredentials({ email: "", password: "" });
    }
  };
  // style={{ background: `url(${wawe})`, backgroundSize: "cover" }}
  return (
    <>
      <div
        className="login-container"
        // style={{
        //   background: `url(${blob})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="login">
          <div className="login_img">
            <img src={Image} alt="Login" />
            <h1 className="login_img__heading">
              Welcome back to <span>NoteSafe</span>
            </h1>
          </div>
          <div className="login-modal">
            <img
              src={Avatar}
              alt="Male vatar"
              className="login_modal_img"
              style={{ alignSelf: "center" }}
            />

            <div className="error" style={style}>
              {err}
            </div>
            <label htmlFor="name">Email:</label>
            <div className="login_field">
              <i className="fas fa-envelope loginIcon"></i>
              <input
                spellCheck="false"
                type="text"
                name="email"
                value={credentials.email}
                onChange={onChange}
                autoComplete="off"
                placeholder="Enter your Email"
              />
            </div>
            <label htmlFor="name">Password:</label>
            <div className="login_field">
              <i className="fas fa-lock loginIcon"></i>
              <input
                spellCheck="false"
                type="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder="Enter your password"
              />
            </div>
            <button className="login-save" onClick={() => login()}>
              Login
            </button>
            <h4>
              Need an account? <Link to="/signup">Sign Up</Link>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
