import { AppState } from "../AppState.js";
import { Bug } from "../models/Bug.js";
import { Note } from "../models/Note.js";
import { TrackedBug } from "../models/TrackedBug.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

function _resetBugsArray() {
  AppState.bugs = [];
}
function _clearData() {
  AppState.selectedBug = null;
  AppState.trackers = [];
  AppState.notes = [];
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

  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`);
    AppState.notes = res.data.map(note => new Note(note));
  }

  async getTrackersByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`);
    AppState.trackers = res.data.map(tracker => new TrackedBug(tracker));
  }

  async addNote(newNote) {
    const res = await api.post('api/notes', newNote);
    AppState.notes.push(new Note(res.data));
  }

  async removeNote(noteObj) {
    const res = await api.delete('api/notes/' + noteObj.id);
    AppState.notes = AppState.notes.filter(note => note.id != noteObj.id);
  }

  async reportBug(newBugData) {
    const res = await api.post('api/bugs', newBugData);
    const newBug = new Bug(res.data);
    AppState.bugs.unshift(newBug);
    return newBug;
  }

  async updateBug(bugObj) {
    const res = await api.put('api/bugs/' + bugObj.id, bugObj);
    logger.log('Bug updates.', res.data);
    AppState.selectedBug = new Bug(bugObj)
  }

  async closeBug(bugObj) {
    const res = await api.delete('api/bugs/' + bugObj.id);
    bugObj.closed = true;
    bugObj.closedDate = new Date();
    logger.log('Bug has been squashed.', res.data);
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