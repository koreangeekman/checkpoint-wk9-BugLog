import { AppState } from "../AppState.js";
import { Bug } from "../models/Bug.js";
import { api } from "./AxiosService.js";

class BugsService {

  async getBugs() {
    const res = await api.get('api/bugs');
    AppState.bugs = res.data.map(bug => new Bug(bug));
  }


}

export const bugsService = new BugsService();