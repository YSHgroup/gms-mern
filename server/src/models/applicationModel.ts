import { Schema, model } from "mongoose";

const ApplicationSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  enrollment: {
    type: Number,
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
  assigned: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reviewer_1: {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  reviewer_2: {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
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
  finance: {
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
  rejected: {
    type: {
      reviewer: String,
    },
  },
  askMoreInfo: {
    type: Boolean,
    default: false
  },
  additionalDoc: {
    type: [String],
    default: []
  }
});

export const Application = model("Application", ApplicationSchema);
