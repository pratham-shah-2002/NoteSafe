const express = require("express");
const router = express.Router();

const {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const fetchuser = require("../middleware/fetchuser.js");

router.post("/fetchallnotes", fetchuser, fetchNotes);
router.post("/createnotes", fetchuser, createNote);
router.put("/updatenote/:id", fetchuser, updateNote);
router.delete("/deletenote/:id", fetchuser, deleteNote);

module.exports = router;
