import React from "react";
import NoteContext from "../Context/notes/noteContext";
import { useContext } from "react";

const Modal = () => {
  const context = useContext(NoteContext);
  const { modalstyle, setmodalstyle, updateNote, modalval, setmodalval } =
    context;
  const onChange = (e) => {
    setmodalval({ ...modalval, [e.target.name]: e.target.value });
  };
  return (
    <div className="modalbg" style={modalstyle}>
      <div className="modal">
        <span
          className="modal-close"
          onClick={() => setmodalstyle({ display: "none" })}
        >
          X
        </span>
        <div className="modal-notes">
          <div className="modal-title">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={modalval.title}
              onChange={onChange}
            />
          </div>
          <div className="modal-description">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={modalval.description}
              onChange={onChange}
            />
          </div>
          <button
            className="modal-save"
            onClick={() => {
              updateNote(modalval.title, modalval.description, modalval.id);
              setmodalstyle({ display: "none" });
            }}
          >
            Edit Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
