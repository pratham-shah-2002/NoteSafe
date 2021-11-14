import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Signup.css";
import art from "../images/art.png";
// eslint-disable-next-line

const Signup = () => {
  const history = useHistory();
  const [err, seterr] = useState("");
  const [style, setStyle] = useState({ display: "none", color: "red" });
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const signup = async () => {
    const response = await fetch(
      "https://notesafe.herokuapp.com/api/user/createuser",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
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
      setcredentials({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div>
      <div
        className="signup"
        style={{
          // background: `url(${signupbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="signup-modal">
          <div className="signup_art">
            <div className="signup_heading">
              <div className="signup_heading_h1">
                <h1>
                  Welcome to <span>NoteSafe,</span>
                </h1>
              </div>
              <div className="signup_heading_h3">
                <h3>Your online Safe for everything personel</h3>
              </div>
            </div>
            <img src={`${art}`} alt="Signup" />
          </div>
          <div className="signup_form">
            <div className="signup_form_container">
              <div className="error" style={style}>
                {err}
              </div>
              <div className="signup-field">
                <label htmlFor="name">Name:</label>
                <div className="signupInput">
                  <i className="fas fa-user signupIcon"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="signup-field">
                <label htmlFor="name">Email:</label>
                <div className="signupInput">
                  <i className="fas fa-envelope signupIcon"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="signup-field">
                <label htmlFor="name">Password:</label>
                <div className="signupInput">
                  <i className="fas fa-lock signupIcon"></i>
                  <input
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    spellCheck="false"
                  />
                </div>
              </div>
              <button className="signup-save" onClick={() => signup()}>
                Signup
              </button>
              <h3>
                Already have an account? <Link to="/">Log In</Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
