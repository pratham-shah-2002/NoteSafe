import React, { useState } from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import noteContext from "../Context/notes/noteContext";
import { useContext } from "react";
import wawe0 from "../images/blue.svg";
import wawe1 from "../images/darkblue.svg";
import wawe2 from "../images/pink.svg";
import wawe3 from "../images/yellow.svg";
import wawe4 from "../images/green.svg";
import wawe5 from "../images/red.svg";
import "../styles/card.css";

const Card = ({ title, description, id, color, pattern }) => {
  const context = useContext(noteContext);
  const { deleteNote, setmodalstyle, setmodalval, setSample } = context;
  // eslint-disable-next-line
  const [style, setStyle] = useState({
    backgroundImage: `url(${wawe0})`,
    backgroundRepeat: "no-repeat",
    color: "white",
    backgroundSize: "cover",
  });
  // eslint-disable-next-line
  return (
    <>
      <div
        className="card-body"
        style={
          pattern === "wawe0"
            ? { ...style, backgroundImage: `url(${wawe0})` }
            : pattern === "wawe1"
            ? { ...style, backgroundImage: `url(${wawe1})` }
            : pattern === "wawe2"
            ? { ...style, backgroundImage: `url(${wawe2})` }
            : pattern === "wawe3"
            ? { ...style, backgroundImage: `url(${wawe3})` }
            : pattern === "wawe4"
            ? { ...style, backgroundImage: `url(${wawe4})` }
            : pattern === "wawe5"
            ? { ...style, backgroundImage: `url(${wawe5})` }
            : { ...style, backgroundImage: `url(${wawe0})` }
        }
      >
        <div className="note-material">
          <h1 className="card-body__h1">{title}</h1>
          <div className="card-body__p">
            <p>{description}</p>
          </div>
          <DeleteRoundedIcon
            onClick={() => deleteNote(id)}
            className="DeleteBtn"
          />
          <i
            className="fas fa-edit"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setmodalstyle({
                display: "flex",
              });
              setmodalval({
                title: title,
                description: description,
                id: id,
                pattern: pattern,
                update: false,
              });
              setSample(
                pattern === "wawe0"
                  ? { background: `url(${wawe0})` }
                  : pattern === "wawe1"
                  ? { background: `url(${wawe1})` }
                  : pattern === "wawe2"
                  ? { background: `url(${wawe2})` }
                  : pattern === "wawe3"
                  ? { background: `url(${wawe3})` }
                  : pattern === "wawe4"
                  ? { background: `url(${wawe4})` }
                  : pattern === "wawe5"
                  ? { background: `url(${wawe5})` }
                  : { background: `url(${wawe0})` }
              );
            }}
          ></i>
        </div>
      </div>
    </>
  );
};
export default Card;
