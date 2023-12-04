import { NextRequest, NextResponse } from "next/server";
import Workout from "@/app/models/WorkoutModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";

export async function GET(req: NextRequest) {
  //   console.log(req.query.exerciseId);
  //   const currentId = new ObjectId(String(req.query.exerciseId));

  try {
    await connectMongoDB();
    const workout = await Workout.find().populate("exercisesArr");
    console.log(workout);
    return NextResponse.json({ message: "Success", result: workout });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
