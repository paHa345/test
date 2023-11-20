import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/libs/MongoConnect";
import Workout from "@/models/WorkoutModel";
import User from "@/models/UserModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log(req.query.exerciseId);
  //   const currentId = new ObjectId(String(req.query.exerciseId));
  try {
    await connectMongoDB();
    const user = await User.findById(req.query.userId).populate({
      path: "workoutsArr",
      populate: {
        path: "exercisesArr",
        model: "Exercise",
        select: "id name",
      },
    });
    res.status(200).send({ message: "Success", result: user });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
}
