import React, { useState } from "react";
import NoteContext from "../Context/notes/noteContext";
import wawe0 from "../images/blue.svg";
import wawe1 from "../images/darkblue.svg";
import wawe2 from "../images/pink.svg";
import wawe3 from "../images/yellow.svg";
import wawe4 from "../images/green.svg";
import wawe5 from "../images/red.svg";
import { useContext } from "react";
import "../styles/modal.css";

const Modal = () => {
  const context = useContext(NoteContext);
  const {
    modalstyle,
    setmodalstyle,
    updateNote,
    createNote,
    modalval,
    setmodalval,
    sample,
    setSample,
  } = context;
  const onChange = (e) => {
    setmodalval({ ...modalval, [e.target.name]: e.target.value });
  };
  const [pattern, setPattern] = useState("wawe0");

  return (
    <div className="modalbg" style={modalstyle}>
      <div className="modal">
        <span
          className="modal-close"
          onClick={() => setmodalstyle({ display: "none" })}
        >
          X
        </span>
        <div className="preview">
          <div className="sampleNote" style={sample}>
            <div className="sampleNotePattern">
              <h1>Sample</h1>
            </div>
          </div>
        </div>
        <div className="setNoteData">
          <div className="modal-notes">
            <div className="modal-title">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                value={modalval.title}
                onChange={onChange}
                spellCheck="false"
                autoComplete="off"
                placeholder="Enter title"
              />
            </div>
            <div className="modal-description">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                value={modalval.description}
                onChange={onChange}
                spellCheck="false"
                autoComplete="off"
                placeholder="Enter description"
              />
            </div>
            <div className="selectPattern">
              <h3>Select theme for note</h3>
              <div className="patterns">
                <div
                  className="wawe0 wawe"
                  onClick={() => {
                    setSample({
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      background: `url(${wawe0})`,
                    });
                    setPattern("wawe0");
                  }}
                ></div>
                <div
                  className="wawe1 wawe"
                  onClick={() => {
                    setSample({
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      background: `url(${wawe1})`,
                    });
                    setPattern("wawe1");
                  }}
                ></div>
                <div
                  className="wawe2 wawe"
                  onClick={() => {
                    setSample({
                      background: `url(${wawe2})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    });
                    setPattern("wawe2");
                  }}
                ></div>
                <div
                  className="wawe3 wawe"
                  onClick={() => {
                    setSample({
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      background: `url(${wawe3})`,
                    });
                    setPattern("wawe3");
                  }}
                ></div>
                <div
                  className="wawe4 wawe"
                  onClick={() => {
                    setSample({
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      background: `url(${wawe4})`,
                    });
                    setPattern("wawe4");
                  }}
                ></div>
                <div
                  className="wawe5 wawe"
                  onClick={() => {
                    setSample({
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      background: `url(${wawe5})`,
                    });
                    setPattern("wawe5");
                  }}
                ></div>
              </div>
            </div>
            {modalval.update === true ? (
              <button
                className="modal-save"
                onClick={async () => {
                  await createNote(
                    modalval.title,
                    modalval.description,
                    modalval.id,
                    pattern
                  );
                  setmodalstyle({ display: "none" });
                  setSample({ background: `url(${wawe0})` });
                  setmodalval({ title: "", description: "", pattern: "wawe0" });
                  setPattern("wawe0");
                }}
              >
                Add Note
              </button>
            ) : (
              <button
                className="modal-save"
                onClick={() => {
                  updateNote(
                    modalval.title,
                    modalval.description,
                    modalval.id,
                    pattern
                  );
                  setmodalstyle({ display: "none" });
                  setmodalval({ title: "", description: "", pattern: "wawe0" });
                  setSample({ background: `url(${wawe0})` });
                  setPattern("wawe0");
                }}
              >
                Edit Note
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
