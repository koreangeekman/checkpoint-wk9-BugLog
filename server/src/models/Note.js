import { Schema } from "mongoose";

export const NoteSchema = new Schema({
  body: { type: String, required: true, maxLength: 1000 },
  bugId: { type: Schema.Types.ObjectId, required: true, ref: 'Bug' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })

NoteSchema.virtual('creator', {
  foreignField: '_id',
  localField: 'creatorId',
  justOne: true,
  ref: 'Account'
})

NoteSchema.virtual('bug', {
  foreignField: '_id',
  localField: 'bugId',
  justOne: true,
  ref: 'Bug'
})