import { dbContext } from "../db/DbContext.js";

function _sanitizeBody(bugObj) {
  const updateable = {
    title: bugObj.title,
    description: bugObj.description,
    priority: bugObj.priority,
    closed: bugObj.closed
  }
  return updateable;
}

class BugsService {

  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).sort({ updatedAt: -1 });
    return bugs
  }

  async getBugById(_id) {
    const bug = (await dbContext.Bugs.findById(_id)).populate('creator', 'name picture');
    return bug
  }

  // SECTION 🔽 AUTHORIZATION REQUIRED 🔽

  async createBug(bugObj) {
    const newBug = await dbContext.Bugs.create(bugObj);
    await newBug.populate('creator', 'name email picture')
    return newBug
  }

  async editBug(creatorId, bugId, bugObj) {
    const updates = _sanitizeBody(bugObj);
    const bug = await dbContext.Bugs.findOneAndUpdate(
      { _id: bugId, creatorId },
      { $set: updates },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    );
    return bug
  }

  async squashBug(creatorId, _id) {
    const bug = await dbContext.Bugs.findOneAndUpdate(
      { creatorId, _id },
      {
        $set: {
          closed: true,
          closedDate: new Date()
        }
      }
    );
    return bug
  }

}

export const bugsService = new BugsService();