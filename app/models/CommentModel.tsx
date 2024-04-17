import { ICommentSchema } from "../types";
import mongoose from "mongoose";
import Exercise from "./ExerciseModel";

const commentSchema = new mongoose.Schema<ICommentSchema>({
  data: { type: Date, required: true },
  score: { type: Number, required: true },
  text: { type: String, required: false },
  userId: { type: String, required: true },
  exerciseId: { type: String, required: true },
});
commentSchema.post("save", async function (doc, next) {
  console.log(`Comment was saved`);
  // тут контекст this - это сам объект созданного комментария
  // console.log(`This ${this}`);
  const exerciseAvgUserRaiting = await Comment.aggregate([
    { $match: { exerciseId: this.exerciseId } },
    { $group: { _id: null, avgRaiting: { $avg: "$score" } } },
  ]);
  // console.log(exerciseAvgUserRaiting[0].avgRaiting);
  const currentUpdatedexercise = await Exercise.findOneAndUpdate(
    { _id: this.exerciseId },
    { avgUsersRaiting: String(Math.round(exerciseAvgUserRaiting[0].avgRaiting * 100) / 100) }
  );
  next();
});

// commentSchema.pre("findOneAndDelete", async function (next) {
//   console.log(`Comment was deleted`);
//   // тут контекст this - это запрос (query) для удпления документа
//   // и можно получить id удалённого комментария
//   console.log(`This ${this}`);
//   return next();
// });
commentSchema.post("findOneAndDelete", async function (doc, next) {
  console.log(`Comment was deleted`);
  // тут контекст this - это запрос (query) для удпления документа
  // и можно получить id удалённого комментария
  console.log(`This ${this.getQuery()._id}`);
  console.log(`Document: ${doc.exerciseId}`);

  const exerciseAvgUserRaiting = await Comment.aggregate([
    { $match: { exerciseId: doc.exerciseId } },
    { $group: { _id: null, avgRaiting: { $avg: "$score" } } },
  ]);
  console.log(exerciseAvgUserRaiting);
  // const currentUpdatedexercise = await Exercise.findOneAndUpdate(
  //   { _id: doc.exerciseId },
  //   { avgUsersRaiting: String(Math.round(exerciseAvgUserRaiting[0].avgRaiting * 100) / 100) }
  // );
  next();
});

const Comment =
  mongoose.models.Comment ||
  mongoose.model<ICommentSchema>("Comment", commentSchema, "execisesAppComments");

export default Comment;
