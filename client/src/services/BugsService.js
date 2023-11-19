import { AppState } from "../AppState.js";
import { Bug } from "../models/Bug.js";
import { TrackedBug } from "../models/TrackedBug.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

function _resetBugsArray() {
  AppState.bugs = [];
}
function _clearData() {
  AppState.selectedBug = null;
  AppState.trackers = [];
}

class BugsService {

  async getBugs() {
    const res = await api.get('api/bugs');
    AppState.bugs = res.data.map(bug => new Bug(bug));
  }

  async getBugById(bugId) {
    const res = await api.get('api/bugs/' + bugId);
    AppState.selectedBug = new Bug(res.data);
  }

  async getTrackedBugsByAccount() {
    _resetBugsArray();
    const res = await api.get('account/trackedbugs');
    AppState.bugs = res.data.map(bug => new Bug(bug.bug));
  }

  async getTrackersByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`);
    AppState.trackers = res.data.map(tracker => new TrackedBug(tracker));
  }

  async reportBug(newBug) {
    const res = await api.post('api/bugs', newBug);
    AppState.bugs.push(new Bug(res.data));
  }

  async trackBug(bugId, accountId) {
    const tracking = AppState.trackers.find(track => track.accountId == accountId);
    if (!tracking) {
      const res = await api.post('api/trackedbugs', { bugId });
      AppState.trackers.push(new TrackedBug(res.data));
    } else {
      const res = await api.delete('api/trackedbugs/' + tracking.id);
      AppState.trackers = AppState.trackers.filter(track => track.accountId != accountId);
      logger.log('Toggle tracking', res.data);
    }
  }

  selectBug(bugObj) {
    _clearData();
    AppState.selectedBug = bugObj;
  }

}

export const bugsService = new BugsService();