import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";


export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
      .delete('/:trackedBugId', this.removeTracking)
  }

  async createTrackedBug(req, res, next) {
    try {
      const response = await trackedBugsService.createTrackedBug(req.userInfo.id, req.body.bugId);
      res.send(response)
    }
    catch (error) { next(error) }
  }

  async removeTracking(req, res, next) {
    try {
      const response = await trackedBugsService.removeTracking(req.userInfo.id, req.params.trackedBugId);
      res.send(response)
    }
    catch (error) { next(error) }
  }

}