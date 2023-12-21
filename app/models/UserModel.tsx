import mongoose from "mongoose";
import Workout from "./WorkoutModel";
import { IUserSchema } from "../types";

const userSchema = new mongoose.Schema<IUserSchema>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, minlength: 4, maxlength: 200 },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
  },
  workoutsArr: [{ type: mongoose.Types.ObjectId, ref: Workout, required: false }],
});

const User =
  mongoose.models.User || mongoose.model<IUserSchema>("User", userSchema, "exercisesAppUsers");

export default User;
