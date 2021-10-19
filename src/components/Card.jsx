import React from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import noteContext from "../Context/notes/noteContext";
import { useContext } from "react";

const Card = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, setmodalstyle, setmodalval } = context;
  return (
    <>
      <div className="card-body">
        <h1>{props.title}</h1>
        <p>{props.note}</p>
        <DeleteRoundedIcon
          onClick={() => deleteNote(props.id)}
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
              title: props.title,
              description: props.note,
              id: props.id,
            });
          }}
        ></i>
      </div>
    </>
  );
};
export default Card;
