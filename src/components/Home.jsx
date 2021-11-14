import React, { useEffect } from "react";
import NoteContext from "../Context/notes/noteContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import noNotes from "../images/nonotes.png";
import typing from "../images/typing.png";
import wawe0 from "../images/blue.svg";

import Card from "./Card";
const Home = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const {
    Notes,

    modalval,
    setmodalval,
    fetchNotes,
    setmodalstyle,
    setSample,
  } = context;

  // eslint-disable-next-line

  return (
    <>
      <div className="mainComponent">
        {Notes.length > 0 ? (
          <div className="allTheNotes">
            {Notes &&
              Notes.map((val, index) => {
                return (
                  <Card
                    title={val.title}
                    description={val.description}
                    key={index}
                    id={val._id}
                    pattern={val.pattern}
                  />
                );
              })}
            {Notes.length > 0 ? (
              <div
                className="addNew"
                onClick={() => {
                  setmodalstyle({ display: "flex" });
                  setmodalval({ title: "", description: "", update: true });
                  setSample({ background: `url(${wawe0})` });
                }}
                style={{
                  background: `url(${typing})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h2 className="addNew__heading">
                  <span>+</span> Add new
                </h2>
              </div>
            ) : null}
          </div>
        ) : null}
        {!localStorage.getItem("token") ||
          (!Notes.length && (
            <div className="noNotes">
              <img src={`${noNotes}`} alt="" />

              <h1>
                No Notes to display!
                <span
                  onClick={() => {
                    setmodalstyle({ display: "flex" });
                    setmodalval({ ...modalval, update: true });
                    setSample({ background: `url(${wawe0})` });
                  }}
                >
                  Add a Note
                </span>
              </h1>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
