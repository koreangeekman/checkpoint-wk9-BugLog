
export class Bug{
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.priority = data.priority
    this.closed = data.closed
    this.closedDate = data.closedDate
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}