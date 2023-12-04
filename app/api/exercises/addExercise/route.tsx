import Exercise from "@/app/models/ExerciseModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req.method);
  if (req.method === "POST") {
    console.log(req.body);
    try {
      await connectMongoDB();
      const addedExercise = await Exercise.create(req.body);
      console.log(addedExercise.result._id);
      return NextResponse.json({ message: "Success", result: addedExercise });
    } catch (error: any) {
      return NextResponse.json({ message: error?.message }, { status: 400 });
    }
  } else {
    return NextResponse.json({ message: "Для данного url только POST запросы" }, { status: 400 });
  }
}
