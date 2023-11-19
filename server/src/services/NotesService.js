import { dbContext } from "../db/DbContext.js";

class NotesService {

  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId })
      .populate('creator', 'name picture')
      .populate('bug');
    return notes
  }

  // SECTION 🔽 AUTHORIZATION REQUIRED 🔽

  async createNote(noteObj) {
    const newNote = await dbContext.Notes.create(noteObj);
    await newNote.populate('creator', 'name picture');
    await newNote.populate('bug');
    return newNote
  }

  async removeNote(creatorId, _id) {
    const note = await dbContext.Notes.remove({ creatorId, _id });
    return note
  }


}

export const notesService = new NotesService();