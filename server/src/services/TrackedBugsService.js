import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";


class TrackedBugsService {


  async getTrackingByBugId(bugId) {
    const bugs = await dbContext.TrackedBugs.find({ bugId })
      .populate('tracker', 'name picture')
      .populate('bug')
    return bugs
  }

  async getTrackedBugsByAccount(accountId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ accountId })
      .populate('bug')
    return trackedBugs
  }

  async createTrackedBug(accountId, bugId) {
    const trackedBug = await dbContext.TrackedBugs.create({ accountId, bugId })
    await trackedBug.populate('tracker', 'name picture');
    await trackedBug.populate('bug');
    return trackedBug
  }

  async removeTracking(accountId, _id) {
    const trackedBug = await dbContext.TrackedBugs.findOne({ accountId, _id })
    if (trackedBug.accountId != accountId) {
      throw new Forbidden('Not your tracking to remove');
    }
    await trackedBug.delete();
    return trackedBug
  }

}

export const trackedBugsService = new TrackedBugsService();