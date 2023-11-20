import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/MongoConnect";
import Workout from "@/models/WorkoutModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log(req.query.exerciseId);
  //   const currentId = new ObjectId(String(req.query.exerciseId));
  try {
    await connectMongoDB();
    const workout = await Workout.find().populate("exercisesArr");
    console.log(workout);
    res.status(200).send({ message: "Success", result: workout });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
}
