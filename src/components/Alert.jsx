import React from "react";
import "../styles/Alert.css";

const Alert = ({ style, mssg }) => {
  return (
    <div className="alert-container" style={style}>
      <i className="fas fa-check"></i>
      <h4 className="alert-messege">{mssg}</h4>
    </div>
  );
};

export default Alert;
