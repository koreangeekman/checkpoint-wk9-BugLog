import { AppState } from "../AppState.js";
import { Bug } from "../models/Bug.js";
import { TrackedBug } from "../models/TrackedBug.js";
import { api } from "./AxiosService.js";

function _clearData() {
  AppState.bugs = [];
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
    _clearData();
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

  async trackBug(bugId) {
    const res = await api.post('api/trackedbugs', { bugId });
    AppState.trackers.push(new TrackedBug(res.data));
  }

  selectBug(bugObj) {
    AppState.selectedBug = bugObj;
  }

}

export const bugsService = new BugsService();