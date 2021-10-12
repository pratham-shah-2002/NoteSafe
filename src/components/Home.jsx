import React from "react";
import NoteContext from "../Context/notes/noteContext";
import { useContext } from "react";
import Card from "./Card";
const Home = () => {
  const context = useContext(NoteContext);
  const { Notes } = context;

  return (
    <>
      <div id="mainComponent">
        <div className="Body">
          <div className="showNote">
            <div className="main-div">
              <input type="text" placeholder="Title" className="title" />
              <input
                type="text"
                placeholder="Take a note..."
                className="note"
              />
            </div>
            <button className="addbtn">+</button>
          </div>
        </div>
        <div className="allTheNotes">
          {Notes.map((val, index) => {
            return (
              <Card
                title={val.title}
                note={val.description}
                key={index}
                id={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
