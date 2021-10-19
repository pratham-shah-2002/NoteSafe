import React from "react";
import NoteContext from "../Context/notes/noteContext";
import { useContext, useState } from "react";

import Card from "./Card";
const Home = () => {
  const context = useContext(NoteContext);
  const { Notes, createNote } = context;
  const [note, setNote] = useState({title: "", description: ""});

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <div id="mainComponent">
        <div className="Body">
          <div className="showNote">
            <div className="main-div">
              <input type="text" placeholder="Title" className="title" name="title" value={note.title} onChange={onChange}/>
              <input
                type="text"
                placeholder="Take a note..."
                className="note"
                value={note.description}
                onChange={onChange}
                name="description"
              />
            </div>
            <button className="addbtn" onClick={() => createNote(note.title, note.description)}>+</button>
          </div>
        </div>
        <div className="allTheNotes">
          {Notes.map((val, index) => {
            return (
              <Card
                title={val.title}
                note={val.description}
                key={index}
                id={val._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
