import { Schema, model } from "mongoose";

const commentShema = new Schema({
  reviewer: {
    type: String,
  },
  col_dean: {
    type: String,
  },
  grant_dep: {
    type: String,
  },
  grant_dir: {
    type: String,
  },
});

export const Comment = model("Comment", commentShema);
