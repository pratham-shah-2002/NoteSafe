import React from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

const Card = (props) => {
  return (
    <>
      <div className="card-body">
        <h1>{props.title}</h1>
        <p>{props.note}</p>
        <DeleteRoundedIcon
          onClick={() => {
            props.onSelect(props.id);
          }}
          className="DeleteBtn"
        />
      </div>
    </>
  );
};
export default Card;
