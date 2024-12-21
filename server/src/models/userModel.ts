import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
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
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    enrollment: {
      type: Number
    },
    allowed: {
      type: Boolean,
      default: false
    },
    rejected: {
      type: Boolean,
      default: false
    },
    refreshToken: {
      type: String
    }
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
