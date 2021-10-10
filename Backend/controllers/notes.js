const Notes = require("../models/Notes");

const fetchNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const createNote = async (req, res) => {
  const { title, description, tag } = req.body;
  const note = {
    title: title,
    description: description,
    tag: tag,
    user: req.user.id,
  };
  const newNote = await Notes(note);
  await newNote.save();
  res.status(200).json({ newNote });
};

const updateNote = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    let note = await Notes.findById(id);
    if (note.user != userId) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const { title, description, tag } = req.body;
    if (title) {
      note.title = title;
    }
    if (description) {
      note.description = description;
    }
    if (tag) {
      note.tag = tag;
    }
    const newNote = await Notes.findByIdAndUpdate(id, note);
    note = await Notes.findById(id);
    res.send(note);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteNote = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    let note = await Notes.findById(id);
    if (note.user != userId) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const newNote = await Notes.findByIdAndDelete(id);
    if (!newNote) {
      return res.status(400).json("Note not found");
    }
    res.send("Deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = { fetchNotes, createNote, updateNote, deleteNote };
