import { Schema } from "mongoose";

export const BugSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
  priority: { type: Number, required: true, min: 1, max: 5 },
  closed: { type: Boolean, required: true, default: false },
  closedDate: { type: Date, required: false },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })

BugSchema.virtual('creator', {
  foreignField: '_id',
  localField: 'creatorId',
  justOne: true,
  ref: 'Account'
})