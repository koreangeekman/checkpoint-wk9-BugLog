import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugsService.js";
import { notesService } from "../services/NotesService.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:bugId', this.getBugById)
      .get('/:bugId/notes', this.getNotesByBugId)
      .get('/:bugId/trackedbugs', this.getTrackingByBugId)
      // 🔽 AUTHORIZATION REQUIRED 🔽
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.squashBug)
  }

  async getBugs(req, res, next) {
    try {
      const response = await bugsService.getBugs(req.query);
      res.send(response)
    } catch (error) { next(error) }
  }

  async getBugById(req, res, next) {
    try {
      const response = await bugsService.getBugById(req.params.bugId);
      res.send(response)
    } catch (error) { next(error) }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const response = await notesService.getNotesByBugId(req.params.bugId);
      res.send(response)
    } catch (error) { next(error) }
  }

  async getTrackingByBugId(req, res, next) {
    try {
      const response = await trackedBugsService.getTrackingByBugId(req.params.bugId);
      res.send(response)
    } catch (error) { next(error) }
  }

  // SECTION 🔽 AUTHORIZATION REQUIRED 🔽

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const response = await bugsService.createBug(req.body);
      res.send(response)
    } catch (error) { next(error) }
  }

  async editBug(req, res, next) {
    try {
      const response = await bugsService.editBug(req.userInfo.id, req.params.bugId, req.body);
      res.send(response)
    } catch (error) { next(error) }
  }

  async squashBug(req, res, next) {
    try {
      const response = await bugsService.squashBug(req.userInfo.id, req.params.bugId);
      res.send(response)
    } catch (error) { next(error) }
  }

}