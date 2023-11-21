import { IExerciseSchema } from "@/types";
import mongoose from "mongoose";
import Comment from "./CommentModel";

const execiseSchema = new mongoose.Schema<IExerciseSchema>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: false },
  isBest: { type: Boolean, required: true },
  type: { type: String, required: true },
  raiting: { type: String, required: true },
  muscleGroups: [{ type: String, required: true }],
  video: { type: String, required: false },
  description: { type: String, required: true },
  mainGroup: { type: String, required: true },
  mainGroupRu: { type: String, required: true },
  commentsArr: [{ type: mongoose.Types.ObjectId, required: false, ref: Comment }],
});

const Exercise =
  mongoose.models.Exercise ||
  mongoose.model<IExerciseSchema>("Exercise", execiseSchema, "exercises");

export default Exercise;
