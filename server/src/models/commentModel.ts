import { Schema, model } from "mongoose";

const commentShema = new Schema({
  reviewer_1: {
    url: String,
    text: String,
  },
  reviewer_2: {
    url: String,
    text: String,
  },
  col_dean: {
    url: String,
    text: String,
  },
  grant_dep: {
    text: String,
  },
  grant_dir: {
    text: String,
  },
  // attached: [
  //   {
  //     chaining: {
  //       type: String,
  //       enum: ['reviewer_1', 'reviewer_2', 'col_dean'],
  //       required: true
  //     },
  //     url: String
  //   }
  // ]
});

export const Comment = model("Comment", commentShema);
