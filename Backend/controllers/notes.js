const Notes = require("../models/Notes");

const fetchNotes = async (req, res) => {
  let success = false;
  try {
    const notes = await Notes.find({ user: req.user.id });
    success = true;
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).json({ success, error: "Internal Server error" });
  }
};

const createNote = async (req, res) => {
  let success = false;
  const { title, description, tag, pattern } = req.body;
  const note = {
    title: title,
    description: description,
    tag: tag,
    user: req.user.id,
    pattern: pattern,
  };
  try {
    const newNote = await new Notes(note);
    await newNote.save();
    success = true;
    res.status(200).json({ success, newNote });
  } catch (error) {
    res.status(500).json({ success, error: "Internal Server error" });
  }
};

const updateNote = async (req, res) => {
  let success = false;
  const userId = req.user.id;
  const id = req.params.id;
  try {
    let note = await Notes.findById(id);
    if (!note) {
      return res.status(400).json({ success, error: "null" });
    }
    if (note.user != userId) {
      return res.status(401).json({ success, error: "Access Denied" });
    }
    const { title, description, pattern } = req.body;
    if (title) {
      note.title = title;
    }
    if (description) {
      note.description = description;
    }
    if (pattern) {
      note.pattern = pattern;
    }
    const newNote = await Notes.findByIdAndUpdate(id, note);
    note = await Notes.findById(id);
    success = true;
    res.status(200).json({ success, note });
  } catch (error) {
    res.status(500).json({ success, error: "Internal Server error" });
  }
};

const deleteNote = async (req, res) => {
  let success = false;
  const userId = req.user.id;
  const id = req.params.id;
  try {
    let note = await Notes.findById(id);
    if (note.user != userId) {
      return res.status(401).json({ success, error: "Access Denied" });
    }
    const newNote = await Notes.findByIdAndDelete(id);
    if (!newNote) {
      return res.status(400).json({ success, error: "Note not found" });
    }
    res.json({ success, messege: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success, error: "Internal Server error" });
  }
};

module.exports = { fetchNotes, createNote, updateNote, deleteNote };
