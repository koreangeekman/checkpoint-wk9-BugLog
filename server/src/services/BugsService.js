import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";

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
    const bugs = await dbContext.Bugs.find(query)
      .populate('creator', 'name email picture')
      .sort({ updatedAt: -1 });
    return bugs
  }

  async getBugById(_id) {
    const bug = (await dbContext.Bugs.findById(_id))
      .populate('creator', 'name email picture');
    return bug
  }

  // SECTION 🔽 AUTHORIZATION REQUIRED 🔽

  async createBug(bugObj) {
    if (bugObj.priority > 5) { throw new BadRequest('Invalid priority level') }
    const newBug = await dbContext.Bugs.create(bugObj);
    await newBug.populate('creator', 'name email picture')
    return newBug
  }

  async editBug(creatorId, bugId, bugObj) {
    const updates = _sanitizeBody(bugObj);
    const bug = await dbContext.Bugs.findOne({ _id: bugId, creatorId })
    if (!bug) { throw new BadRequest('Unable to locate a matching bug with your ID') }
    if (bug.closed) { throw new BadRequest('Cannot update bugs after closure') }
    await bug.update(
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
      },
      { new: true }
    );
    if (!bug) { throw new BadRequest('Unable to locate a matching bug with your ID') }
    return bug
  }

}

export const bugsService = new BugsService();