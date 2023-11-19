import { AppState } from "../AppState.js";
import { Bug } from "../models/Bug.js";
import { api } from "./AxiosService.js";

function _clearData() {
  AppState.bugs = [];
}

class BugsService {

  async getBugs() {
    const res = await api.get('api/bugs');
    AppState.bugs = res.data.map(bug => new Bug(bug));
  }

  async getTrackedBugsByAccount() {
    _clearData();
    const res = await api.get('account/trackedbugs');
    AppState.bugs = res.data.map(bug => new Bug(bug.bug));
  }

  async reportBug(newBug) {
    const res = await api.post('api/bugs', newBug);
    AppState.bugs.push(new Bug(res.data));
  }



}

export const bugsService = new BugsService();