import { Schema, model } from "mongoose";

const ApplicationSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  application: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  currencyType: {
    type: String,
    required: true,
  },
  milestone: {
    type: Number,
    required: true,
  },
  signed: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reviewer: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  col_dean: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  grant_dep: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  grant_dir: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  accepted: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  comment: {
    type: Schema.ObjectId,
    ref: "Comment",
  },
  announcement: {
    type: Schema.ObjectId,
    ref: "Announcement",
  },
});

export const Application = model("Application", ApplicationSchema);
