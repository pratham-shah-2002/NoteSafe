import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";

export default function App() {
  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("document"));
    if (x) {
      setarr(() => {
        return [...x];
      });
    }
  }, []);
  const [Flag, setFlag] = useState(false);
  const [Flat, setFlat] = useState(0);
  const [tit, settit] = useState("");
  const [note, setnote] = useState("");
  const [title, settitle] = useState({
    display: "none",
  });
  const titleField = (event) => {
    settit(event.target.value);
  };
  const noteField = (event) => {
    setnote(event.target.value);
  };
  const [arr, setarr] = useState([]);
  const fun = () => {
    if (Flag === false) {
      settitle({
        display: "block",
      });
      setFlag(true);
    }
  };
  const DeleteNote = (id) => {
    setarr((old) => {
      return old.filter((ele, index) => {
        return index !== id;
      });
    });
    setFlat(1);
    // let a = arr;
    // a.splice(id, 1);
    // console.log(a);
    // localStorage.setItem("document", JSON.stringify(a));
  };
  const toHide = () => {
    if (Flag !== true) {
      settitle({ display: "none" });
    } else if (Flag === true) {
      setFlag(false);
    }
  };
  const hideit = () => {
    settitle({ display: "none" });
  };
  const addToList = () => {
    let obj = {
      Tit: tit,
      Note: note,
    };
    setFlat(1);
    setarr((old) => {
      return [...old, obj];
    });
    settit("");
    setnote("");
    settitle({
      display: "none",
    });
    let l = JSON.parse(localStorage.getItem("document"));
    l.push(obj);
    localStorage.setItem("document", JSON.stringify(l));
  };
  return (
    <>
      <div id="mainComponent" onClick={toHide}>
        <Header />
        <div className="Body">
          <div className="showNote" onClickCapture={fun}>
            <div className="main-div">
              <input
                type="text"
                placeholder="Title"
                className="title"
                style={title}
                onChange={titleField}
                value={tit}
              />
              <input
                type="text"
                placeholder="Take a note..."
                className="note"
                onChange={noteField}
                value={note}
              />
            </div>
            <button className="addbtn" style={title} onClick={addToList}>
              +
            </button>
          </div>
        </div>
        <div className="allTheNotes">
          {Flat === 1
            ? localStorage.setItem("document", JSON.stringify(arr))
            : true}
          {arr.map((val, index) => {
            return (
              <Card
                title={val.Tit}
                note={val.Note}
                key={index}
                id={index}
                onSelect={DeleteNote}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
