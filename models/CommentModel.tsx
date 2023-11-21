import Exercise from "@/models/ExerciseModel";
import { ICommentSchema } from "@/types";
import mongoose from "mongoose";
const commentSchema = new mongoose.Schema<ICommentSchema>({
  date: { type: Date, required: true },
  score: { type: Number, required: true },
  text: { type: String, required: false },
  userId: { type: String, required: true },
  exerciseId: { type: String, required: true },
});

const Comment =
  mongoose.models.Comment ||
  mongoose.model<ICommentSchema>("Comment", commentSchema, "execisesAppComments");

export default Comment;
