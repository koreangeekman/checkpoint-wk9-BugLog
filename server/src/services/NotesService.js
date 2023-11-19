import { dbContext } from "../db/DbContext.js";

class NotesService {

  async getNotesByBugId(query) {
    const bugs = await dbContext.TrackedBugs.find(query);
    return bugs
  }

  // SECTION 🔽 AUTHORIZATION REQUIRED 🔽

  async createNote(noteObj) {
    const newNote = await dbContext.Notes.create(noteObj);
    return newNote
  }

  async removeNote(creatorId, _id) {
    const note = await dbContext.Notes.remove({ creatorId, _id });
    return note
  }


}

export const notesService = new NotesService();