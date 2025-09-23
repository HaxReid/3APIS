import { Schema, model } from "mongoose";

export type UserType = {
  email: string;
  hashPwd: string;
};

const UserSchema = new Schema({
  email: { type: String, require: true },
  hashPwd: { type: String, require: true },
});

export default model("User", UserSchema);
