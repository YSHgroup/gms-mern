import { Schema, model } from "mongoose";

const roleShcema = new Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export const Role = model("Role", roleShcema);
