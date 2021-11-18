import React from "react";

import { Link, useHistory } from "react-router-dom";

import "../styles/navbar.css";

const Header = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <div className="container">
        <div className="app_name">
          <h1 className="Header_h1">NoteSafe</h1>
        </div>
        {!localStorage.getItem("token") ? (
          <div className="auth">
            <Link to="/login">
              <button>Login</button>
            </Link>
            &nbsp;
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
        ) : (
          <div className="auth">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
