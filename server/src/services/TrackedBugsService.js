import { dbContext } from "../db/DbContext.js";


class TrackedBugsService {


  async getTrackingByBugId(bugId) {
    const bugs = await dbContext.TrackedBugs.find({ bugId });
    return bugs
  }

  async getTrackedBugsByAccount(accountId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ accountId });
    return trackedBugs
  }

  async createTrackedBug(accountId, bugId) {
    const trackedBug = await dbContext.TrackedBugs.create({ accountId, bugId })
    return trackedBug
  }

  async removeTracking(accountId, bugId) {
    const trackedBug = await dbContext.TrackedBugs.remove({ accountId, bugId })
    return trackedBug
  }

}

export const trackedBugsService = new TrackedBugsService();