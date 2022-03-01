const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
//ROUTE 1: Get get all the notes using : GET "/api/auth/getnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500, "Internal Server Error");
  }
});
//ROUTE 2: Add a new note using : POST "/api/auth/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors,return bad request and the errrors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500, "Internal Server Error");
    }
  }
);
//ROUTE 3: update an existing note using : PUT "/api/auth/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the note to be updated and update it
    let notes = await Notes.findById(req.param.id);
    if (!notes) {
      res.status(404).send("Not found");
    }
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).json("Not allowed");
    }
    notes = await Notes.findByIdAndUpdate(
      req.param.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ notes });
  } catch (error) {
    console.error(error.message);
    res.status(500, "Internal Server Error");
  }
});
//ROUTE 4: delete an existing note using : DELETE "/api/auth/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be updated and update it
    let notes = await Notes.findById(req.param.id);
    if (!notes) {
      res.status(404).send("Not found");
    }
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).json("Not allowed");
    }
    notes = await Notes.findByIdAndDelete(req.param.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500, "Internal Server Error");
  }
});
module.exports = router;
