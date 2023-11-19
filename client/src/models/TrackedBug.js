
export class TrackedBug {
  constructor(data) {
    this.id = data.id
    this.bugId = data.bugId
    this.bug = data.bug
    this.accountId = data.accountId
    this.tracker = data.tracker
  }
}