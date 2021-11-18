import React from "react";
import NoteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const [Notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalstyle, setmodalstyle] = useState({
    visiblity: "hidden",
    opacity: 0,
    pointerEvents: "none",
  });
  const [modalformstyle, setmodalformstyle] = useState({
    opacity: 0,
    transform: "translateY(7vh)",
  });
  const [sample, setSample] = useState({ background: "" });
  const [pattern, setPattern] = useState("wawe0");
  const [alert, setalert] = useState("Note Updated Successfully");
  const [alertStyle, setalertStyle] = useState({
    opacity: 0,
    transform: "translateY(50px)",
  });
  const handleAlert = (messege) => {
    {
      setalert(messege);
      setalertStyle({ opacity: 1, transform: "translateY(0)" });
      setTimeout(() => {
        setalert(messege);
        setalertStyle({ opacity: 0, transform: "translateY(50px)" });
      }, 3000);
    }
  };
  const [modalval, setmodalval] = useState({
    title: "",
    description: "",
    id: "",
    update: false,
    pattern: "",
  });

  const [mode, setmode] = useState("light");
  const url = "https://notesafe.herokuapp.com/api/";
  // const url = "http://localhost:5000/api/";
  const fetchNotes = async () => {
    const response = await fetch(`${url}notes/fetchallnotes`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
  };

  const createNote = async (title, description, id, pattern) => {
    const response = await fetch(`${url}notes/createnotes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, pattern }),
    });
    const json = await response.json();
    fetchNotes();
    console.log(json);
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${url}notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    console.log(json);
    const newNotes = Notes.filter((val) => {
      return val._id !== id;
    });
    setNotes(newNotes);
    //fetchNotes();
  };

  const updateNote = async (title, description, id, pattern) => {
    const response = await fetch(`${url}notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, pattern }),
    });
    const json = await response.json();
    console.log(json);
    let note = Notes;
    for (let i = 0; i < Notes.length; i++) {
      if (note[i]._id === id) {
        note[i].title = title;
        note[i].description = description;
        note[i].pattern = pattern;
        break;
      }
    }
    setNotes(note);
    fetchNotes();
  };

  return (
    <NoteContext.Provider
      value={{
        Notes,
        setNotes,
        createNote,
        deleteNote,
        fetchNotes,
        updateNote,
        modalstyle,
        modalval,
        setmodalstyle,
        setmodalval,
        mode,
        loading,
        setLoading,
        setmode,
        sample,
        setSample,
        alert,
        setalert,
        alertStyle,
        setalertStyle,
        handleAlert,
        pattern,
        setPattern,
        modalformstyle,
        setmodalformstyle,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
