import Exercise from "@/app/models/ExerciseModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.json();
    try {
      await connectMongoDB();
      const addedExercise = await Exercise.create(body);
      console.log(addedExercise);
      return NextResponse.json({ message: "Success", result: addedExercise });
    } catch (error: any) {
      console.log(error.code === 11000);
      if (error.code === 11000) {
        return NextResponse.json({ message: error?.message }, { status: 406 });
      } else {
        return NextResponse.json({ message: error?.message }, { status: 400 });
      }
    }
  } else {
    return NextResponse.json({ message: "Для данного url только POST запросы" }, { status: 400 });
  }
}
