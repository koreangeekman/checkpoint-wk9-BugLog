import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.removeNote)
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const response = await notesService.createNote(req.body);
      res.send(response)
    }
    catch (error) { next(error) }
  }

  async removeNote(req, res, next) {
    try {
      const response = await notesService.removeNote(req.userInfo.id, req.params.noteId);
      res.send(response)
    }
    catch (error) { next(error) }
  }

}