import React from "react";
import noteContext from "../Context/notes/noteContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
const Header = () => {
  const mystyle = {
    background:
      'url("https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png")',
    height: "50px",
    width: "40px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  const context = useContext(noteContext);
  return (
    <>
      <div className="container">
        <div className="app_name">
          <div style={mystyle} className="keep_icon" />
          <h1 className="Header_h1">Keep</h1>
        </div>
        <div className="auth">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
