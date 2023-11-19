import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema({
  bugId: { type: Schema.Types.ObjectId, required: true, ref: 'Bug' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })

TrackedBugSchema.virtual('bug', {
  foreignField: '_id',
  localField: 'creatorId',
  justOne: true,
  ref: 'Bug'
})

TrackedBugSchema.index({ bugId: 1, accountId: 1 }, { unique: true })