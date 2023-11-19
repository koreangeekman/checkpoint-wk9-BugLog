import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class NotesService {

  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId })
      .populate('creator', 'name email picture')
      .populate('bug');
    return notes
  }

  // SECTION 🔽 AUTHORIZATION REQUIRED 🔽

  async createNote(noteObj) {
    const newNote = await dbContext.Notes.create(noteObj);
    await newNote.populate('creator', 'name email picture');
    await newNote.populate('bug');
    return newNote
  }

  async removeNote(creatorId, _id) {
    const note = await dbContext.Notes.findOneAndDelete({ creatorId, _id });
    logger.log(note)
    if (!note) { throw new BadRequest('Unable to find a matching note with your ID') }
    return note
  }


}

export const notesService = new NotesService();