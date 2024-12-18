import { Schema, model } from "mongoose";

const announcementShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  until: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

export const Announcement = model("Announcement", announcementShema);
