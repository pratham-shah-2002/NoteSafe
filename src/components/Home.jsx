import React, { useEffect, useState } from "react";
import NoteContext from "../Context/notes/noteContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import noNotes from "../images/nonotes.png";
import typing from "../images/typing.png";
import wawe0 from "../images/wawe0.svg";
import Spinner from "./Spinner";
import Alert from "./Alert";

import Card from "./Card";
const Home = () => {
  const history = useHistory();
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const {
    Notes,
    loading,
    modalval,
    setmodalval,
    fetchNotes,
    setmodalstyle,
    setSample,
    alert,
    alertStyle,
    setLoading,
    setmodalformstyle,
  } = context;
  // eslint-disable-next-line

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/signup");
    } else {
      setLoading(true);
      fetchNotes();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="mainComponent">
        {loading ? <Spinner /> : null}
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
                  setmodalstyle({
                    visiblity: "visible",
                    opacity: 1,
                    pointerEvents: "all",
                  });
                  setmodalformstyle({
                    opacity: 1,
                    transform: "translateY(0)",
                  });
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
        {!loading && !Notes.length && (
          <div className="noNotes">
            <img src={`${noNotes}`} alt="" />

            <h1>
              No Notes to display!
              <span
                onClick={() => {
                  setmodalstyle({
                    visiblity: "visible",
                    opacity: 1,
                    pointerEvents: "all",
                  });
                  setmodalformstyle({
                    opacity: 1,
                    transform: "translateY(0)",
                  });
                  setmodalval({ ...modalval, update: true });
                  setSample({ background: `url(${wawe0})` });
                }}
              >
                Add a Note
              </span>
            </h1>
          </div>
        )}
        <Alert style={alertStyle} mssg={alert} />
      </div>
    </>
  );
};

export default Home;
