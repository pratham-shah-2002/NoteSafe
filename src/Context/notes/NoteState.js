import React from "react";
import NoteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const [Notes, setNotes] = useState([]);
  useEffect(() => {
    fetchNotes();
  }, []);
  const url = "http://localhost:5000/api/notes/";
  const fetchNotes = async () => {
    const response = await fetch(`${url}fetchallnotes`, {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MTRhMDUwZTdkMzE0OTY3ZmZjOGU0In0sImlhdCI6MTYzMzg3NTI3N30.RmRASp0ScziXvFgZ4uE3P0sVQvuhDUdfjubs5HWK97w",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const notes = await response.json();
    setNotes(notes);
  };
  return (
    <NoteContext.Provider value={{ Notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
