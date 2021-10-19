import React from "react";
import NoteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const [Notes, setNotes] = useState([]);
  const [modalstyle, setmodalstyle] = useState({display: "none"});
  const [modalval, setmodalval] = useState({title: "", description: "", id: "" });
  useEffect(() => {
    fetchNotes();
  }, []);
  const url = "http://localhost:5000/api/";
  const fetchNotes = async () => {
    const response = await fetch(`${url}notes/fetchallnotes`, {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2YzBlY2I4ZmM2ZGVmYTg2NjZmZjNkIn0sImlhdCI6MTYzNDQ3MTYyN30.HXyJC-qJK-vu-ifY-hfUINJGN34uQQ_cTlORwSVwCIM",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const notes = await response.json();
    setNotes(notes);
  };

  const createNote = async (title, description) => {
    const response = await fetch(`${url}notes/createnotes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2YzBlY2I4ZmM2ZGVmYTg2NjZmZjNkIn0sImlhdCI6MTYzNDQ3MTYyN30.HXyJC-qJK-vu-ifY-hfUINJGN34uQQ_cTlORwSVwCIM"},
      body: JSON.stringify({title, description})
    })
    const json = await response.json();
    fetchNotes();
    console.log(json);
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${url}notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2YzBlY2I4ZmM2ZGVmYTg2NjZmZjNkIn0sImlhdCI6MTYzNDQ3MTYyN30.HXyJC-qJK-vu-ifY-hfUINJGN34uQQ_cTlORwSVwCIM"},
      body: JSON.stringify()
    });
    const json = await response.json();
    const newNotes = Notes.filter((val) => {
      return val._id !== id;
    });
    setNotes(newNotes);
    fetchNotes();
  }

  const updateNote = async (title, description, id) => {
    const response = await fetch(`${url}notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2YzBlY2I4ZmM2ZGVmYTg2NjZmZjNkIn0sImlhdCI6MTYzNDQ3MTYyN30.HXyJC-qJK-vu-ifY-hfUINJGN34uQQ_cTlORwSVwCIM"},
      body: JSON.stringify({title, description})
    });
    const json = await response.json();
    console.log(json);
    let note = Notes;
    for(let i = 0; i < Notes.length; i++){
      if(note[i]._id == id){
        note[i].title = title;
        note[i].description = description;
        break;
      }
    }
    setNotes(note);
    fetchNotes();
  }

  return (
    <NoteContext.Provider value={{ Notes, setNotes, createNote, deleteNote, updateNote, modalstyle, modalval, setmodalstyle, setmodalval}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
