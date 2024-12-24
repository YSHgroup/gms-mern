import { Schema, model } from "mongoose";


const Review = new Schema({
  url: {
    type: String
  },
  text: {
    type: String
  }
})

const commentShema = new Schema({
  reviewer_1: {
    type: Review
  },
  reviewer_2: {
    type: Review
  },
  col_dean: {
    type: Review
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
