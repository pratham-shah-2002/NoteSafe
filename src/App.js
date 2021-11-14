import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import NoteState from "./Context/notes/NoteState";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Modal />
          <Switch>
            <Route exact path="/">
              <Header />
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
