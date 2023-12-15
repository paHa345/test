import { IWorkoutSchema } from "../types";
import mongoose from "mongoose";
import Exercise from "./ExerciseModel";

const workoutSchema = new mongoose.Schema<IWorkoutSchema>({
  comments: { type: String, required: false },
  date: { type: Date, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: false, default: String(Date.now()) },
  exercisesArr: [
    {
      name: { type: String, required: true },
      id: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
    },
  ],
});

const Workout =
  mongoose.models.Workout ||
  mongoose.model<IWorkoutSchema>("Workout", workoutSchema, "testWorkout");

export default Workout;
