import React, { useState } from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import noteContext from "../Context/notes/noteContext";
import { useContext } from "react";
import wawe0 from "../images/wawe0.svg";
import wawe1 from "../images/wawe1.svg";
import wawe2 from "../images/wawe2.svg";
import wawe3 from "../images/wawe3.svg";
import wawe4 from "../images/wawe4.svg";
import wawe5 from "../images/wawe5.svg";
import "../styles/card.css";

const Card = ({ title, description, id, pattern }) => {
  const context = useContext(noteContext);
  const {
    deleteNote,
    setmodalstyle,
    setmodalval,
    setSample,
    setPattern,
    handleAlert,
    setmodalformstyle,
  } = context;
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
        {/* <div className="note-material"> */}
        <h1 className="card-body__h1">{title}</h1>
        <div className="card-body__p">
          <p>{description}</p>
        </div>
        <div className="cardIcons">
          <DeleteRoundedIcon
            onClick={() => {
              deleteNote(id);
              handleAlert("Note Deleted Successfully");
            }}
            className="DeleteBtn"
          />
          <i
            className="fas fa-edit"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setmodalstyle({
                visiblity: "visible",
                opacity: 1,
                pointerEvents: "all",
              });
              setmodalval({
                title: title,
                description: description,
                id: id,
                pattern: pattern,
                update: false,
              });
              setmodalformstyle({
                opacity: 1,
                transform: "translateY(0)",
              });
              setPattern(pattern);
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
        {/* </div> */}
      </div>
    </>
  );
};
export default Card;
