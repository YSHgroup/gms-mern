import { Schema, model } from "mongoose";


const reviewObject = new Schema({
  url: {
    type: String
  },
  text: {
    type: String
  }
})

const commentShema = new Schema({
  reviewer_1: {
    type: reviewObject
  },
  reviewer_2: {
    type: reviewObject
  },
  col_dean: {
    type: reviewObject
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
